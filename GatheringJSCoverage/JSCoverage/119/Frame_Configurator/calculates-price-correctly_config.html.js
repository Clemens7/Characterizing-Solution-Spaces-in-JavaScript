

            matColorRow = document.querySelector("div.mat-color-row");
            console.log(matColorRow);

            matColorRow.onchange = function() {
              checkedMatColor = document.querySelector("input[name = 'matColor']:checked");
              console.log(checkedMatColor);
            }
            
          