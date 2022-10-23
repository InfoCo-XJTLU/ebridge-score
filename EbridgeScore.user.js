// ==UserScript==
// @name         EbridgeScore
// @version      0.1
// @description  XJTLU ebridge自动计算成绩插件！
// @author       InFoCo
// @match        https://ebridge.xjtlu.edu.cn/*
// @grant        none
// @license      GPL-3.0-only
// @namespace https://greasyfork.org/users/883597
// ==/UserScript==

(function() {
    'use strict';

    let all = document.querySelectorAll("body > div.sv-page-content.sv-container-fluid > div");
    console.log(all.length);
    for(let n =7;n<7+all.length;n++){
        let table = document.querySelector('body > div.sv-page-content.sv-container-fluid > div:nth-child('+n+') > div.sv-panel-body > div > table > tbody');

        var Average = 0.00;
        for(let i=1;i<table.children.length;i++){
            if(table.children[i].children[2].textContent == ""|| table.children[i].children[3].textContent =="") {continue;}
            Average += parseInt(table.children[i].children[2].textContent)*parseFloat(table.children[i].children[3].textContent)/100;
        }
        Average=Average.toFixed(2);
        //计算成绩
        let score = document.createElement("tr");
        var Name =["Average","Total","-"];
        for(const i of Name){
            let t = document.createElement("td");
            t.className='sv-col-md-2';
            t.innerText = i;
            score.appendChild(t);
        }
        let t = document.createElement("td");
        t.className='sv-col-md-2';
        t.innerText = Average;
        score.appendChild(t);
        //console.log(score);
        table.appendChild(score);
        if(n==7){
            //添加社团文字和图标
            var logo = document.createElement('img');
            logo.src = 'data:image/gif;base64,R0lGODlhQABAAPYAAAAAAAQGCgYJDQsLDBEPDwYMEwoOEwcOGQgPGQsRFgwTGxQUFBAXHxoaGg0XIQ4ZJQ8dKxIXJBIbJhIeKhQhLhQkNBUnORYqPRssPB0wPyMjIysrKy8yNDMzMzs7OxYtQxkuQRsyRRw1Sx44Txs1Uh05Ux49WiEzQyE1SSQ6TCo4SiI7UyE+WSRAVyVCXCpEXCRGYihHYCRIYitLZiRJaCpNaytRbTRSbSVQcixUdCpWeC1ZfDBWdTJYdzNbe0VFRUpKSlRUVFtaWmZlZmtra3Jycnt7ey5dhC9fiTJdgS5ghy5kjjRihjJkjDpoji1mky5plS5nmC9tnzJnkjRqlTlrlTRtmjhumjVwnTpxnTRxoTp0oIODg4uLi5SUlJycnKSkpKurq6+vsLOzs7u7uwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAABAAEAAAAf+gACCg4SFhoeIiYqLjI2Oj5CPC5GUlYgYEgIBlpyUGC8ADyGCEwiGmwAGLqOdlQpMCYIzFAAgTKaoqB9NVlQOrZQ6NQCbFD2Cq4ICMwIIOk1NS1UwwJAQWRXEgjwiAActmzUsFkkhASFVT00G1Y4sWb/aEkwBCTMFKzAhOQqCAUlPrNBqxyhHlX6EQjigUOHAlRwmNqFaYcUKCoKMdFwZWKhCjQ9XbBiCQMUKC4yLcmihdshEFhwHCG0qgOTKSZSJWliZMkEbIQlXXAxCRSyJlhU4E5GE4iNmoQ9WjggwRNPKiaSJZPTSEZNoiZ0P/A2KMMVKT6yHBOygMiUJRwD+MHq93UTDyg6iaAsh6GHlCRUXseDuPDsIA5Uq2fIiKiCDSkAfBQCUuJIksr8QZUn4VHyowhEoSiJfo0GsgggdFUdwZmRDC2lBL86+2DKFCojVixAwsWJBEANTllFnw4u70AMqSqaCmLEpAosCCqh82Fy80AS7E2hc6bkphBMSOqpIoF5dEIQptbXEKGRiS5MoSdiVL5SgCXomCAnBuOIX6fxCOGhhBQbkBcBCRU0QN18CNVygSAU0+PffhAQpSOGFOA2AYSMGCFGEFw1sqMgAXnChgQdTlWchIkN8seIiBDQwSSQDEMEFF10MoWEjXxgRSQAEDFFiGD/QWMQXXgz+4cEgMybShRc7NqLBEENwsUGNG1TSAIhMFoFKlIMM0OMhGzTJZBhfhJjIAFkmskkHZHQwSANfzGijmQF4AYYHHqi5gBFgFGGEERpoE0QYhZIniAdIDtFFEGASskEYIW5CQBhAAPDDF2QI4RMQXYBBhhhcCFLEGB4QACoYbXLhYyKTcrHABkOEQUSkgmgARqGbLABGEECA8UMXPm6yQYleFFEmAA1g6pMRdQLgKgA7EqVhi1FuAMYQh/jaJrNdECGGnFx8QUCuHQhB6SAbjPHtADgKoq6ahAywiRFdEMKBGEsS0sAGjArhQatjECEvGZmyi6o2G5CqwQINhJooAHr+BuFBBxoEIaipYwTRwAA/FFyImGSgOYYR/Q6KiqpdFLlJs3L600ARYdz4RcKCLEDEGGOI8cUXYyRMQAc/H8kFvf780EGZG5y7iQbEzTqIB2CcW8gCD+PKrAdWDoA0MRo0YDUkRCnYcMzVvNjJJkMYofUiZeMmhJkb2iuWT2ozglfejqgwXgI9RZAiA+NZskCKFbzlyAQYYGCBAgYowEIJFWBw20URNJ6CBfI5IEEADlQwwQQK0DIBAyBkkOIJASzAQAwhCJB4ARRgkGIiGOiAgggriADDCihIYEELCryQeQoYxEDCRQAggAKELUSwggUuYHCDAzMYINELEqwAAgZfIohQAwcWmOAC87izYoABCCwQATEMCCBAApEHsIndpBB4OAAFRD6AfIIYAAICMBUCGsABBShAM9QmOkXBjRgYSMHt3IQTvhUiborY21BExMEOevCDIAyhCEdIwhJ6MBAAOw==';
            let tt = document.createElement("tr");
            let t = document.createElement("td");
            t.className='sv-col-md-2';
            t.innerText = '本插件由InfoCo计算机社WYN制作 --- Made by InfoCo Computer Club';
            tt.appendChild(t);
            table.insertBefore(tt,table.firstChild);
            table.insertBefore(logo, table.firstChild);
        }
    }

    // Your code here...
})();
