// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('login', ({username, password})=>{
    cy.request('POST', 'http://127.0.0.1:3001/api/login', {username, password})
        .then(({body})=>{
            localStorage.setItem('blogAppUser', JSON.stringify(body))
            cy.visit('http://127.0.0.1:3000')
        })
})


Cypress.Commands.add('createBlog', ({title, author, url, likes})=>{
    cy.request(
        {
            url: 'http://127.0.0.1:3001/api/blogs',
            method: 'POST',
            body: {title, author, url, likes: likes || 0},
            headers: {
                'Authorization': `bearer ${JSON.parse(localStorage.getItem('blogAppUser')).token}`
            }
        }
    )
    cy.visit('http://127.0.0.1:3000')
})

Cypress.Commands.add('createUser', (user)=>{
    cy.request('POST', 'http://127.0.0.1:3001/api/users', user)

})