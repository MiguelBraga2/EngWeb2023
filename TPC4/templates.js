exports.mainPage = function(tasks, date){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="w3.css">
            <title>Tasks management</title>
        </head>
        <body>
            <header class="w3-container w3-indigo w3-center">
                <h1>Tasks server</h1>
            </header>
            <div class="w3-card-4">
                <form class="w3-container" method="POST">
                    <p>      
                    <label class="w3-text-blue"><b>Name</b></label>
                    <input class="w3-input w3-border w3-light-gray" name="Who" type="text"></p>
                    <p>      
                    <label class="w3-text-blue"><b>Description</b></label>
                    <textarea class="w3-input w3-border w3-light-gray" name="description"></textarea>
                    <p>
                    <p>      
                    <label class="w3-text-blue"><b>Due Date</b></label>
                    <input class="w3-input w3-border w3-light-gray" name="due_date" type="date"></p>
                    <p>
                    <button class="w3-btn w3-blue" type="submit">Register new task</button></p>
                </form>
            </div>
            <div class="w3-row w3-card-4 ">
                <div class="w3-col l6">
                    <h3 class="w3-center">TO DO Items</h3>
                    <ul>
            `
    // TO DOs
    for(let i=0; i<tasks.length; i++){
        if ('done' in tasks[i] == false || tasks[i].done == '0'){
            pagHTML += `<p>
                            <li>${tasks[i].description} <b>until</b> ${tasks[i].due_date}</li>
                            <a href="/edit/${tasks[i].id}">[EDIT]</a>
                            <a href="/submit/${tasks[i].id}">[SUBMIT]</a>
                            <a href="/delete/${tasks[i].id}">[DELETE]</a>
                        </p>    
                        `
        }
    }

    pagHTML+=        `
                    <ul>
                </div>
                <div class="w3-col l6">
                    <h3 class="w3-center">Items Done</h3>
                    <ul>
                `
    // Tasks done
    for(let i=0; i<tasks.length; i++){
        if ('done' in tasks[i] && tasks[i].done == '1'){
            pagHTML += `<p>
                        <li>${tasks[i].description}</li>
                        <a href="/undo/${tasks[i].id}">[UNDO]</a>
                        </p>`
        }
    }

                `
                    <ul>
                </div>
            </div>
            <footer class="w3-container w3-purple">
                <h5>Generated by EngWeb2023 in ${date}</h5>
            </footer>
        </body>
    </html>
    `

    return pagHTML;
}

exports.editTaskPage = function(tasks, task, date){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="w3.css">
            <title>Tasks management</title>
        </head>
        <body>
            <header class="w3-container w3-indigo w3-center">
                <h1>Tasks server</h1>
            </header>
            <div class="w3-card-4">
                <form class="w3-container" method="POST">
                    <p>      
                    <label class="w3-text-blue"><b>Name</b></label>
                    <input class="w3-input w3-border w3-light-gray" name="Who" type="text" value=${task.Who}></p>
                    <p>      
                    <label class="w3-text-blue"><b>Description</b></label>
                    <textarea class="w3-input w3-border w3-light-gray" name="description">${task.description}</textarea>
                    <p>
                    <p>      
                    <label class="w3-text-blue"><b>Due Date</b></label>
                    <input class="w3-input w3-border w3-light-gray" name="due_date" type="date" value=${task.due_date}></p>
                    <p>
                    <button class="w3-btn w3-blue" type="submit">Edit task</button></p>
                </form>
            </div>
            <div class="w3-row w3-card-4 ">
                <div class="w3-col l6">
                    <h3 class="w3-center">TO DO Items</h3>
                    <ul>
            `
    // TO DOs
    for(let i=0; i<tasks.length; i++){
        if ('done' in tasks[i] == false || tasks[i].done == '0'){
            pagHTML += `<p>
                            <li>${tasks[i].description} <b>until</b> ${tasks[i].due_date}</li>
                            <a href="/edit/${tasks[i].id}">[EDIT]</a>
                            <a href="/submit/${tasks[i].id}">[SUBMIT]</a>
                            <a href="/delete/${tasks[i].id}">[DELETE]</a>
                        </p>    
                        `
        }
    }

    pagHTML+=        `
                    <ul>
                </div>
                <div class="w3-col l6">
                    <h3 class="w3-center">Items Done</h3>
                    <ul>
                `
    // Tasks done
    for(let i=0; i<tasks.length; i++){
        if ('done' in tasks[i] && tasks[i].done == '1'){
            pagHTML += `<p>
                        <li>${tasks[i].description}</li>
                        <a href="/undo/${tasks[i].id}">[UNDO]</a>
                        </p>`
        }
    }

                `
                    <ul>
                </div>
            </div>
            <footer class="w3-container w3-purple">
                <h5>Generated by EngWeb2023 in ${date}</h5>
            </footer>
        </body>
    </html>
    `

    return pagHTML;
}