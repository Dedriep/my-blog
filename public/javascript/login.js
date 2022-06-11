

async function signUp(event) {
    event.preventDefault()

    const username = document.querySelector('#username-signup').value.trim()
    const email = document.querySelector('#email-signup').value.trim()
    const password = document.querySelector('#username-signup').value.trim()


    if (username && email && password) {
        const response = await fetch('/api/users', {

            method: "post",
            body:JSON.stringify({username,email, password}),
            headers: {'Content-Type' : 'application/json'}

       })

       if (response.ok){
           document.location.replace('/dashboard/')
       } else{
           alert(response.statusText)
       }
    }
}

document.querySelector('#signupBtn').addEventlistener('submit',signUp)



async function signIn (event) {
event.preventDefault()
const username = document.querySelector('#username-input').value.trim()
const password = document.querySelector('#passsword-input').value.trim()

    if(username && password) {
        const response = await fetch ('/api/users/login', {
            method: "post",
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        })
        
        if (response.ok){
            document.location.replace('/dashboard/')
        } else{
            alert(response.statusText)
        }
        }
}

document.querySelector('#signinBtn').addEventlistener('submit',signIn)