describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Shantanu',
      username: 'shantz',
      password: 'asdf'
    }
    const testUser = {
      username: 'testuser',
      name: 'testuser',
      password: 'test'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, testUser)
    cy.visit('')

  })

  it('Login form is shown', function () {
    cy.contains('Log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('shantz')
      cy.get('#password').type('asdf')
      cy.get('#login-button').click()
      cy.contains('shantz logged in')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('shantz')
      cy.get('#password').type('asdf@123')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'invalid username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })

  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: "shantz", name: "Shantanu", password: "asdf" });
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#Title').type('created through cypress')
      cy.get('#Author').type('Cypress')
      cy.get('#Url').type('some_random_URL.xyz')
      cy.get('#submit-button').click()

      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    describe('After a blog is created', function () {
      beforeEach(function () {
        cy.createBlog({ title: "Another Blog created", author: "Cypress", url: "any_random_URL.abc" })
      })
      it('A user can like a blog', function () {
        cy.contains('Another Blog created')
        cy.contains('view').click()
        cy.contains('0')
        cy.get('#like-button').click()
        cy.contains('1')
      })

      it('A user who created a blog can delete it', function () {
        cy.contains('Another Blog created')
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('.success').should('contain', 'Blog Another Blog created was successfully deleted')
        cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')
      })

      it('A blog cannot be deleted by another user', function () {
        cy.clearLocalStorage()
        cy.login({ username: 'testuser', password: 'test' })

        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('.error').should('contain', 'Unauthorized to delete blog')
        cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')

      })

      it('blogs are sorted by number of likes', function () {

        cy.createBlog({
          title: 'A monk who sold his ferrari',
          author: 'Robin Sharma',
          url: 'https://bit.ly/3HsL2u9',
          likes: 18
        })

        cy.createBlog({
          title: 'The Alchemsit',
          author: 'Paulo Coelho',
          url: 'https://bit.ly/3o3wMcX',
          likes: 25
        })

        cy.createBlog({
          title: 'A Song of Ice and Fire',
          author: 'George R. R. Martin',
          url: 'https://bit.ly/3tQXWGy',
          likes: 5
        })

        // Think of a way to get all likes
        cy.contains('view').click()
        cy.contains('view').click()
        cy.contains('view').click()

        cy.get('.blog').eq(0).should('contain', 'The Alchemsit')
        cy.get('.blog').eq(1).should('contain', 'A monk who sold his ferrari')

      })

    })

  })


})