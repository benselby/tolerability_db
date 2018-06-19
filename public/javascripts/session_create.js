console.log('Trying to create a session here!');

var list = document.querySelector('select');
console.log('script got:' + list);
console.log('Options: ' + list.options);

list.addEventListener('change', function() {
    var selected = list.options[list.selectedIndex];
    console.log('user selected ' + selected.text);        
    var selected_study = JSON.parse(selected.value);
    console.log(selected_study.question_set);

    var questions_div = document.getElementById('questions');

    // First, delete any old children 
    
    // Now add the new kids
    for (i in selected_study.question_set.questions){
        //var box = document.createElement();
        //questions_div.appendChild(box);
        var question_title = document.createTextNode(JSON.parse(selected_study.question_set.questions[i].question_name)); 
        var question_text = document.createTextNode(JSON.parse(selected_study.question_set.questions[i].description));
        questions_div.appendChild(question_title);
        questions_div.appendChild(question_text);
    }
});

