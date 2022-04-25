async function commentForm (event){
    event.preventDefault()

    const comment_content= documen.querySelector('textarea[name=comment_content]').value.trim()

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1

    ]
}

document.querySelector('.comment-form').addEventListener('submit', commentForm)