var linkedin_points;
var github_points;
var website_points;
var workexp_points;
var skill_points;

function linkedin(input){
    if(String (input)==null || String (input).search("linkedin.com/in/")==-1){
        linkedin_points =0;
    }
    else{
        linkedin_points =100;
    }
    return linkedin_points;         
}

function github(input){
    if(String(input)==null || String(input).search("github.com/")==-1){
        github_points=0;        
    }
    else{
        github_points=100;
    }
    return github_points;
}

function website(input){
    var request = new XMLHttpRequest();  
    request.open('GET', String(input), true);
    request.onreadystatechange = function(){
        if (request.readyState === 4){
            if (request.status === 404) {  
                website_points=0;
            }  
        }
        else{website_points=100};
    }
    request.send();
    return website_points;    
}

function workexp(input){
    count =0;
    position =0;
    while((position = input.IndexOf('\n', position)) != -1){
        count++;
        position++;
    }
    if(count==0){
        return workexp_points=0;
    }
    else if(count==1){
        return workexp_points=25;
    }
    else if(count==2){
        return workexp_points=50;
    }
    else if(count>=3){
        return workexp_points=100;
    }
}

function skill(input){
    count =0;
    position =0;
    while((position = input.IndexOf('\n', position)) != -1){
        count++;
        position++;
    }
    if(count==0){
        return skill_points=0;
    }
    else if(0<count<=3){
        return skill_points=25;
    }
    else if(3<count<=6){
        return workexp_points=50;
    }
    else if(count>6){
        return workexp_points=100;
    }
}