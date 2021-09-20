import {TestBed} from '@angular/core/testing';

import {
  AjfFieldInstance,
  AjfForm,
  AjfFormRendererService,
  AjfFormSerializer,
  AjfFormsModule
} from './index';

describe('formula field', () => {
  beforeEach(async () => {
    await TestBed
        .configureTestingModule({
          imports: [AjfFormsModule],
        })
        .compileComponents();
  });

  it('the sum of two formulae should produce a number \
  and not a string concatenation',
     done => {
       const formRenderer: AjfFormRendererService = TestBed.get(AjfFormRendererService);
       const json = {
         nodes: [{
           id: 1,
           parent: 0,
           parentNode: 0,
           name: 'form',
           label: 'Form',
           nodeType: 3,
           conditionalBranches: [{condition: 'true'}],
           nodes: [
             {
               parent: 1,
               parentNode: 0,
               id: 1001,
               name: 'formula0',
               label: 'Formula0',
               nodeType: 0,
               fieldType: 6,
               formula: {formula: '1'},
               conditionalBranches: [{condition: 'true'}],
             },
             {
               parent: 1001,
               parentNode: 0,
               id: 1002,
               name: 'formula1',
               label: 'Formula1',
               nodeType: 0,
               fieldType: 6,
               formula: {formula: 'formula0 + 1'},
               conditionalBranches: [{condition: 'true'}],
             }
           ]
         }]
       };
       const form: AjfForm = AjfFormSerializer.fromJson(json);

       formRenderer.nodesTree.subscribe(nodes => {
         const slide = nodes[0];
         const field = slide.nodes[1] as AjfFieldInstance;
         expect(field.value).toEqual(2);
         done();
       });

       formRenderer.setForm(form);
     });

  it('the sum of two number input should produce a number \
     and not a string concatenation when some number input are null',
     done => {
       const formRenderer: AjfFormRendererService = TestBed.get(AjfFormRendererService);
       const json = {
         nodes: [{
           id: 1,
           parent: 0,
           parentNode: 0,
           name: 'form',
           label: 'Form',
           nodeType: 3,
           conditionalBranches: [{condition: 'true'}],
           nodes: [
             {
               parent: 1,
               parentNode: 0,
               id: 1001,
               name: 'number1',
               label: 'Number1',
               nodeType: 0,
               fieldType: 2,
               conditionalBranches: [{condition: 'true'}],
             },
             {
               parent: 1001,
               parentNode: 0,
               id: 1002,
               name: 'number2',
               label: 'Number2',
               nodeType: 0,
               fieldType: 2,
               conditionalBranches: [{condition: 'true'}],
             },
             {
               parent: 1002,
               parentNode: 0,
               id: 1003,
               name: 'formula',
               label: 'Formula',
               nodeType: 0,
               fieldType: 2,
               formula: {formula: 'number1 + number2'},
               conditionalBranches: [{condition: 'true'}],
             }
           ]
         }]
       };
       const form: AjfForm = AjfFormSerializer.fromJson(json, {number1: 1});

       formRenderer.nodesTree.subscribe(nodes => {
         const slide = nodes[0];
         const field = slide.nodes[2] as AjfFieldInstance;
         expect(field.value).toEqual(1);
         done();
       });

       formRenderer.setForm(form);
     });

  it('check field default value', done => {
    const formRenderer: AjfFormRendererService = TestBed.get(AjfFormRendererService);
    const json = {
      nodes: [{
        id: 1,
        parent: 0,
        parentNode: 0,
        name: 'form',
        label: 'Form',
        nodeType: 3,
        conditionalBranches: [{condition: 'true'}],
        nodes: [{
          parent: 1,
          parentNode: 0,
          id: 1001,
          name: 'formula0',
          label: 'Formula0',
          nodeType: 0,
          fieldType: 2,
          defaultValue: 14,
          conditionalBranches: [{condition: 'true'}],
        }]
      }]
    };
    const form: AjfForm = AjfFormSerializer.fromJson(json);

    formRenderer.nodesTree.subscribe(nodes => {
      const slide = nodes[0];
      const field = slide.nodes[0] as AjfFieldInstance;
      expect(field.value).toEqual(14);
      done();
    });

    formRenderer.setForm(form);
  });
});
