describe('ajf-form slide header', () => {
  // The slide strip and the title toolbar were replaced by a single slide header
  // bar, so the only mat-toolbar left in the renderer is the page slider's own
  // navigation bar.
  it('shows the slide header with the slide label and the save button', () => {
    cy.visit('/mat-form/');
    cy.get('.ajf-form-bar').should('have.length', 1);
    cy.get('.ajf-form-bar').should('contain.text', 'Number Field Example');
    cy.get('.ajf-form-bar').should('contain.text', 'Save');
    cy.get('mat-toolbar').should('have.length', 1);
  });

  it('hides the slide header when hideTopToolbar is set', () => {
    cy.visit('/mat-form/?hidetoolbar=true');
    cy.get('.ajf-form-bar').should('not.exist');
    cy.get('mat-toolbar').should('have.length', 1);
  });

  it('shows the slide header when hideTopToolbar is explicitly false', () => {
    cy.visit('/mat-form/?hidetoolbar=false');
    cy.get('.ajf-form-bar').should('have.length', 1);
    cy.get('.ajf-form-bar').should('contain.text', 'Save');
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

  it('counts the filled fields of the slide', () => {
    cy.visit('/mat-form/');
    cy.get('.ajf-slide-title .ajf-pill').should('exist');
  });

  // The issue pill reports the whole form, not the slide on screen, so a form
  // with nothing to validate never shows it.
  it('leaves out the issue pill when no field is failing', () => {
    cy.visit('/mat-form/');
    cy.get('.ajf-issue-pill').should('not.exist');
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

  it('still shows the slide title and the save button', () => {
    cy.visit('/mat-form/?singleslide=true');
    cy.get('.ajf-form-bar').should('contain.text', 'Number Field Example');
    cy.get('.ajf-form-bar').should('contain.text', 'Save');
    cy.get('.ajf-slide-title .ajf-pill').should('exist');
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
