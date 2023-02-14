describe('ajf-form test top toolbar input', () => {
  it(`topbar input is true and hideTopToolbar is not defined:
  should show three mat toolbars(topBar buttonsBar pageSliderToolBar)`, () => {
    cy.visit('/mat-form/?topbar=true');
    cy.get('mat-toolbar').then(tbs => {
      cy.wrap(tbs).should('have.length', 3);
      cy.wrap(tbs[0]).should('contain.text', 'Number Field Example');
      cy.wrap(tbs[1]).should('contain.text', 'Save');
    });
  });
  it(`topbar input is true and hideTopToolbar is false:
  should show one mat toolbar(pageSliderToolBar)`, () => {
    cy.visit('/mat-form/?topbar=true&hidetoolbar=false');
    cy.get('mat-toolbar').then(tbs => {
      cy.wrap(tbs).should('have.length', 3);
      cy.wrap(tbs[0]).should('contain.text', 'Number Field Example');
      cy.wrap(tbs[1]).should('contain.text', 'Save');
    });
  });
  it(`topbar input is true and hideTopToolbar is true:
  should show one mat toolbar(pageSliderToolBar)`, () => {
    cy.visit('/mat-form/?topbar=true&hidetoolbar=true');
    cy.get('mat-toolbar').then(tbs => {
      cy.wrap(tbs).should('have.length', 1);
    });
  });
  it(`topbar input is false and hideTopToolbar is not defined:
  should show two mat toolbars(buttonsBar pageSliderToolBar)`, () => {
    cy.visit('/mat-form/?topbar=false');
    cy.get('mat-toolbar').then(tbs => {
      cy.wrap(tbs).should('have.length', 2);
      cy.wrap(tbs[0]).should('contain.text', 'Save');
    });
  });
  it(`topbar input is false and hideTopToolbar is false:
  should show two mat toolbars(buttonsBar pageSliderToolBar)`, () => {
    cy.visit('/mat-form/?topbar=false&hidetoolbar=false');
    cy.get('mat-toolbar').then(tbs => {
      cy.wrap(tbs).should('have.length', 2);
      cy.wrap(tbs[0]).should('contain.text', 'Save');
    });
  });
  it(`topbar input is false and hideTopToolbar is true:
  should show one mat toolbar(pageSliderToolBar)`, () => {
    cy.visit('/mat-form/?topbar=false&hidetoolbar=true');
    cy.get('mat-toolbar').then(tbs => {
      cy.wrap(tbs).should('have.length', 1);
    });
  });
  it(`topbar input is not defined and hideTopToolbar is not defined:
  should show two mat toolbars(buttonsBar pageSliderToolBar)`, () => {
    cy.visit('/mat-form/');
    cy.get('mat-toolbar').then(tbs => {
      cy.wrap(tbs).should('have.length', 2);
      cy.wrap(tbs[0]).should('contain.text', 'Save');
    });
  });
  it(`topbar input is not defined and hideTopToolbar is false:
  should show two mat toolbars(buttonsBar pageSliderToolBar)`, () => {
    cy.visit('/mat-form/?hidetoolbar=false');
    cy.get('mat-toolbar').then(tbs => {
      cy.wrap(tbs).should('have.length', 2);
      cy.wrap(tbs[0]).should('contain.text', 'Save');
    });
  });
  it(`topbar input is not defined and hideTopToolbar is true:
  should show one mat toolbar(pageSliderToolBar)`, () => {
    cy.visit('/mat-form/?hidetoolbar=true');
    cy.get('mat-toolbar').then(tbs => {
      cy.wrap(tbs).should('have.length', 1);
    });
  });
  it(`topbar input is not defined and hideTopToolbar is true:
     should show one mat toolbar(pageSliderToolBar)`, () => {
    cy.visit('/mat-form/?hidetoolbar=true');
    cy.get('mat-toolbar').then(tbs => {
      cy.wrap(tbs).should('have.length', 1);
    });
  });
});
