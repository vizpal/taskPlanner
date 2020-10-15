// Table Sort function to perform Ascending / Descending column sort 
// ----------------------------------------------------------------------------------
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table-data");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        // Ignore first heading row elements
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            // check if the two rows should switch place,
            // based on the direction, asc or desc
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        // Perform complete table row switch
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

// Display certain number of task list per page

/* const start=0; */
/*         window.onload=function (){ */
/*             getTaskById(start,10); */
/*         } */
/*  */
/*         function next() { */
/*             start=start+1; */
/*             if((start*10)> taskPlanner.taskManagerList.length){ */
/*                 start=start-1; */
/*             } */
/*             else{ */
/*                 getTaskById(start,10); */
/*             } */
/*         } */
/*         function previous() { */
/*             start=start-1; */
/*             if(start < 0){ */
/*                 start=start+1 */
/*             } */
/*             else{ */
/*                 getTaskById(start,10); */
/*             } */
/*         } */
/*  */
/*         function getTaskById(pageIndex,resultsPerPage){ */
/*  */
/*             let offset=pageIndex*resultsPerPage;//page 2=10, page 3=20; */
/*             let limit=offset+resultsPerPage; */
/*             let results=''; */
/*  */
/*             let otbod=document.getElementById('table-data').tableData[0]; */
/*             otbod.innerHTML = ""; */
//loop through data
/*  for (let i= offset; i < limit; i++){ */

/*      let otr=document.createElement('tr'); */
/*      var otd1=document.createElement('td'); */
/*      var otd2=document.createElement('td'); */
/*      var otd3=document.createElement('td'); */
/*      var otd4=document.createElement('td'); */
/*      otd1.innerHTML=a["list"][i]['name']; */
/*      otd2.innerHTML=a["list"][i]['age']; */
/*      otd3.innerHTML=a["list"][i]['height']; */

/*      otr.appendChild(otd1); */
/*      otr.appendChild(otd2); */
/*      otr.appendChild(otd3); */

/*      otbod.appendChild(otr); */
/*  } */

/*  return results; */

// }