
// FORM for tasks:
// Who - 
// Description - 
// Duedate - 

exports.genMainPage = function(){
    var pagHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset = "UTF-8">
                <link rel="stylesheet" href="/w3.css">
                <title>Main Page</title>
            </head>
            <body>
                <div class="w3-container">
                    <center><h2>New Task</h2></center>
                    <form method="POST">
                        <label>Who</label>
                        <input class="w3-input w3-border w3-light-gray" type="text" name="who">
                        <label>Description</label>
                        <input class="w3-input w3-border w3-light-gray" type="text" name="description">
                        <label>Due Date: </label>
                        <input class="w3-input w3-border w3-light-gray" type="date" name="date">
                        <button type="submit">Submit</button>
                    </form>
                </div>
                
            </body>
        </html>
    
    `

    return pagHTML
}