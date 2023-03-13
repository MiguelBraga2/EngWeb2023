
// FORM for tasks:
// Who - 
// Description - 
// Duedate - 

exports.genMainPage = function(tasks, completed){
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
                <div class="w3-row"> 
                    <div class="w3-col m6 l6">
                        <center><h3>TO DO</h3></center>
                        <ul>
                `
    for(let i=0; i<tasks.length; i++){
        pagHTML += `        
                            <li>
                                <div>
                                    <p>${tasks[i].description}</p>
                                    <a href="delete/${tasks[i].id}">[DELETE]</a>
                                    <a href="edit/${tasks[i].id}">[EDIT]</a>
                                    <a href="do/${tasks[i].id}">[Update]</a>
                                </div>
                            </li>
        `
    }

    pagHTML += `            
                        </ul>
                    </div>

                    <div class="w3-col m6 l6">
                        <center><h3>DONE</h3></center>
                    </div>
                </div>                
            </body>
        </html>
    
    `

    return pagHTML
}