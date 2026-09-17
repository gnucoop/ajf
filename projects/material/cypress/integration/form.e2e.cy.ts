describe('ajf-form slide header', () => {
  // The slide strip and the title toolbar were replaced by a single slide header
  // bar, so the only mat-toolbar left in the renderer is the page slider's own
  // navigation bar.
  it('shows the slide header with the slide label', () => {
    cy.visit('/mat-form/');
    cy.get('.ajf-form-bar').should('have.length', 1);
    cy.get('.ajf-form-bar').should('contain.text', 'Number Field Example');
    cy.get('mat-toolbar').should('have.length', 1);
  });

  // The renderer ships no save button of its own: the header holds a projection
  // slot open, and the e2e app projects nothing into it.
  it('shows no save button unless the host projects one', () => {
    cy.visit('/mat-form/');
    cy.get('.ajf-form-bar').should('not.contain.text', 'Save');
    cy.get('.ajf-form-save').should('be.empty');
  });

  it('hides the slide header when hideTopToolbar is set', () => {
    cy.visit('/mat-form/?hidetoolbar=true');
    cy.get('.ajf-form-bar').should('not.exist');
    cy.get('mat-toolbar').should('have.length', 1);
  });

  it('shows the slide header when hideTopToolbar is explicitly false', () => {
    cy.visit('/mat-form/?hidetoolbar=false');
    cy.get('.ajf-form-bar').should('have.length', 1);
    cy.get('.ajf-form-bar').should('contain.text', 'Number Field Example');
  });

  // topBar is deprecated: the slide jump menu is always available from the
  // header, so the input no longer changes what is rendered.
  it('renders the same chrome whatever topBar is set to', () => {
    cy.visit('/mat-form/?topbar=true');
    cy.get('.ajf-form-bar').should('have.length', 1);
    cy.get('mat-toolbar').should('have.length', 1);

    cy.visit('/mat-form/?topbar=false');
    cy.get('.ajf-form-bar').should('have.length', 1);
    cy.get('mat-toolbar').should('have.length', 1);
  });

  it('still hides the header when topBar is set together with hideTopToolbar', () => {
    cy.visit('/mat-form/?topbar=true&hidetoolbar=true');
    cy.get('.ajf-form-bar').should('not.exist');
  });

  it('offers the slide jump menu from the header title', () => {
    cy.visit('/mat-form/');
    cy.get('.ajf-slide-title').click();
    cy.get('.mat-mdc-menu-panel').should('exist');
    cy.get('.mat-mdc-menu-panel').should('contain.text', 'Number Field Example');
  });

  // The jump trigger carries the slide's number and name and nothing else: the
  // pills that used to sit there -- filled fields, repetition count -- read as
  // anything but what they counted, and took the width the name needs.
  it('keeps the pills out of the jump trigger', () => {
    cy.visit('/mat-form/');
    cy.get('.ajf-slide-title .ajf-pill').should('not.exist');
  });

  // What the form still has failing is reported by the footer alone -- the
  // header used to repeat it and gave up a phone's whole header width for it.
  it('leaves the failing field count out of the header', () => {
    cy.visit('/mat-form/');
    cy.get('.ajf-form-bar').should('not.contain.text', 'need attention');
  });

  it('leaves out the footer status when no field is failing', () => {
    cy.visit('/mat-form/');
    cy.get('.ajf-form-footer-status').should('not.exist');
  });
});

// A form with a single page has nowhere to page to, so every paging control is
// left out rather than rendered inert.
describe('ajf-form single slide', () => {
  it('leaves out the paging controls', () => {
    cy.visit('/mat-form/?singleslide=true');
    cy.get('.ajf-form-bar').should('exist');
    cy.get('.ajf-slide-nav').should('not.exist');
    cy.get('.ajf-slide-count').should('not.exist');
    cy.get('.ajf-slide-caret').should('not.exist');
    cy.get('.ajf-slide-title').should('be.disabled');
    cy.get('mat-toolbar button[aria-label="Back"]').should('not.exist');
    cy.get('mat-toolbar button[aria-label="Forward"]').should('not.exist');
  });

  it('still shows the slide title', () => {
    cy.visit('/mat-form/?singleslide=true');
    cy.get('.ajf-form-bar').should('contain.text', 'Number Field Example');
  });

  it('renders the paging controls once there is a second slide', () => {
    cy.visit('/mat-form/');
    cy.get('.ajf-slide-nav').should('exist');
    cy.get('.ajf-slide-count').should('contain.text', 'of 2');
    cy.get('.ajf-slide-caret').should('exist');
    cy.get('.ajf-slide-title').should('not.be.disabled');
    cy.get('mat-toolbar button[aria-label="Back"]').should('exist');
  });
});

describe('ajf-form field rows', () => {
  it('names the type of each field under its label', () => {
    cy.visit('/mat-form/');
    cy.get('.ajf-field-type-name').should('have.length.at.least', 2);
    // The number field, and a two-choice field -- below the search threshold, so
    // it renders as buttons and reads as a plain single choice.
    cy.contains('.ajf-field-type-name', 'number').should('exist');
    cy.contains('.ajf-field-type-name', 'single choice').should('exist');
  });

  it('no longer renders the type badge', () => {
    cy.visit('/mat-form/');
    cy.get('.ajf-type-badge').should('not.exist');
  });
});
