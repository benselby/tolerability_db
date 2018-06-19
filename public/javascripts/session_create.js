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
    while(questions_div.childNodes.length > 0){
        questions_div.removeChild(questions_div.childNodes[0]);
    }
    
    // Now add the new kids
    for (i in selected_study.question_set.questions){
        var div = document.createElement('div');
        var question_p = document.createElement('p');
        var question_title = document.createElement('p')
            .appendChild(
                document.createTextNode(selected_study.question_set.questions[i].question_name)); 
        var question_text = document.createTextNode(selected_study.question_set.questions[i].description);
        question_p.appendChild(question_text);

        var rating = document.createElement('select');
        for (var i=0; i<=10; i++){
            var opt = document.createElement('option');
            opt.text = i;
            opt.value = i;
            rating.appendChild(opt);
        }

        div.appendChild(question_title);
        div.appendChild(question_p);
        div.appendChild(rating);
        questions_div.appendChild(div);
    }
});

