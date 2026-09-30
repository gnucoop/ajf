import {AjfFieldType, AjfForm, AjfNode, AjfNodeGroup, AjfNodeType} from '@ajf/core/forms';
import {firstValueFrom, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

import {
  AjfContainerNode,
  AjfFormBuilderNodeEntry,
  AjfFormBuilderNodeTypeEntry,
  AjfFormBuilderService,
  canContainNode,
} from './form-builder-service';

/**
 * A slide can hold groups of fields, a group cannot hold another group: the
 * form builder offers groups in its palette and keeps that nesting.
 */
describe('Form builder node groups', () => {
  let service: AjfFormBuilderService;
  let sub: Subscription;

  const groupType = (): AjfFormBuilderNodeTypeEntry =>
    service.availableNodeTypes.find(t => t.nodeType.node === AjfNodeType.AjfNodeGroup)!;
  const stringType = (): AjfFormBuilderNodeTypeEntry =>
    service.availableNodeTypes.find(t => t.nodeType.field === AjfFieldType.String)!;
  const nodes = () => firstValueFrom(service.nodes);
  const slide = async () => (await nodes())[0] as AjfContainerNode;
  const entry = (node: AjfNode) => ({node} as AjfFormBuilderNodeEntry);

  beforeEach(() => {
    service = new AjfFormBuilderService();
    // The streams of the service only fold the updates they see once
    // subscribed, and the current form reads all of them.
    sub = service.getCurrentForm().subscribe();
    service.setForm(testForm());
  });

  afterEach(() => sub.unsubscribe());

  it('offers groups in the palette', () => {
    expect(groupType()).toBeDefined();
    expect(groupType().isSlide).toBeFalsy();
  });

  it('adds a group to a slide', async () => {
    const s = await slide();
    service.insertNode(groupType(), s, 0, true, 1);

    const children = (await slide()).nodes;
    expect(children.map(n => n.nodeType)).toEqual([
      AjfNodeType.AjfField,
      AjfNodeType.AjfNodeGroup,
      AjfNodeType.AjfNodeGroup,
    ]);
    expect(children[1].name).toBe('new_group_1');
  });

  it('adds a field to a group, numbering it after the group', async () => {
    const group = (await slide()).nodes[1] as AjfNodeGroup;
    service.insertNode(stringType(), group, 0, true, 1);

    const updated = (await slide()).nodes[1] as AjfNodeGroup;
    expect(updated.nodes.map(n => n.id)).toEqual([1002001, 1002002]);
    expect(updated.nodes[1].parent).toBe(1002001);
  });

  it('does not add a group to a group', async () => {
    const group = (await slide()).nodes[1] as AjfNodeGroup;
    service.insertNode(groupType(), group, 0, true, 0);

    const updated = (await slide()).nodes[1] as AjfNodeGroup;
    expect(updated.nodes.map(n => n.nodeType)).toEqual([AjfNodeType.AjfField]);
  });

  it('moves a field from the slide into a group and back out', async () => {
    const field = (await slide()).nodes[0];
    const group = (await slide()).nodes[1] as AjfNodeGroup;
    service.moveNodeEntryToContainer(entry(field), group, 1);

    let s = await slide();
    expect(s.nodes.map(n => n.name)).toEqual(['group']);
    expect((s.nodes[0] as AjfNodeGroup).nodes.map(n => n.name)).toEqual(['in_group', 'outside']);
    expect((s.nodes[0] as AjfNodeGroup).nodes.map(n => n.id)).toEqual([1001001, 1001002]);

    const moved = (s.nodes[0] as AjfNodeGroup).nodes[0];
    service.moveNodeEntryToContainer(entry(moved), s, 1);

    s = await slide();
    expect(s.nodes.map(n => n.name)).toEqual(['group', 'in_group']);
    expect((s.nodes[0] as AjfNodeGroup).nodes.map(n => n.name)).toEqual(['outside']);
  });

  it('does not move a group into a group', async () => {
    service.insertNode(groupType(), await slide(), 0, true, 2);
    const [, group, other] = (await slide()).nodes;
    service.moveNodeEntryToContainer(entry(other), group as AjfNodeGroup, 0);

    expect((await slide()).nodes.map(n => n.nodeType)).toEqual([
      AjfNodeType.AjfField,
      AjfNodeType.AjfNodeGroup,
      AjfNodeType.AjfNodeGroup,
    ]);
  });

  it('allows fields and groups in a slide, fields only in a group', async () => {
    const [field, group] = (await slide()).nodes;
    expect(canContainNode(await slide(), group)).toBeTrue();
    expect(canContainNode(group, field)).toBeTrue();
    expect(canContainNode(group, group)).toBeFalse();
    expect(canContainNode(group, await slide())).toBeFalse();
  });

  it('strips the resolved choices of the fields inside a group', async () => {
    const form = await firstValueFrom(service.getCurrentForm().pipe(take(1)));
    const group = form.nodes[0].nodes[1] as AjfNodeGroup;
    expect('choices' in group.nodes[0]).toBeFalse();
    expect((group.nodes[0] as any).choicesOriginRef).toBe('colors');
  });
});

const testForm = (): AjfForm =>
  ({
    nodes: [
      {
        id: 1,
        parent: 0,
        parentNode: 0,
        label: 'Slide 1',
        name: 'slide_1',
        nodeType: AjfNodeType.AjfSlide,
        conditionalBranches: [],
        nodes: [
          {
            id: 1001,
            parent: 1,
            parentNode: 0,
            label: 'Outside',
            name: 'outside',
            nodeType: AjfNodeType.AjfField,
            fieldType: AjfFieldType.String,
            conditionalBranches: [],
          },
          {
            id: 1002,
            parent: 1001,
            parentNode: 0,
            label: 'Group',
            name: 'group',
            nodeType: AjfNodeType.AjfNodeGroup,
            conditionalBranches: [],
            nodes: [
              {
                id: 1002001,
                parent: 1002,
                parentNode: 0,
                label: 'In group',
                name: 'in_group',
                nodeType: AjfNodeType.AjfField,
                fieldType: AjfFieldType.SingleChoice,
                choicesOriginRef: 'colors',
                choices: [{label: 'Red', value: 'red'}],
                conditionalBranches: [],
              },
            ],
          },
        ],
      },
    ],
    choicesOrigins: [],
    attachmentsOrigins: [],
    stringIdentifier: [],
  } as unknown as AjfForm);
