const CreateUser = document.querySelector('.CreateUser')

CreateUser.addEventListener('submit', (e) => {
  e.preventDefault()
  const idCustomer=CreateUser.querySelector('.idCustomer').value
  const CustomerMail = CreateUser.querySelector('.CustomerMail').value
  const CustomerPassword = CreateUser.querySelector('.CustomerPassword').value
  post('/createUser', { idCustomer,CustomerMail, CustomerPassword })
})

function post (path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
