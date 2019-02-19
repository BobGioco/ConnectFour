function checkName(name1,name2){
  while(name1===name2){
    alert("Player 2 has identical name as player 1! Enter the name again!");
    name2=prompt("Player 2: Enter Your Name, you will have red chips") ;
  };
  return name2;
};
var player1=prompt("Player 1: Enter Your Name, you will have blue chips") ;
while(player1.length<3){
  alert("You must enter name! Minimum is 3 characters!");
  player1=prompt("Player 1: Enter Your Name, you will have red chips") ;
};

var player2=prompt("Player 2: Enter Your Name, you will have red chips") ;
player2=checkName(player1,player2);
while(player2.length<3){
  alert("You must enter name! Minimum is 3 characters!");
  player2=prompt("Player 2: Enter Your Name, you will have red chips") ;
  player2=checkName(player1,player2);
};


var blueDescription="rgb(0, 0, 255)";
var redDescription="rgb(255, 0, 0)";
var currentColor="";
var blueChip=': it is your turn, please pick a column to drop your blue chip.';
var redChip=': it is your turn, please pick a column to drop your red chip.';
player1=player1;
player2=player2;

var col=[[0,8,16,24,32,40,48,56],
[1,9,17,25,33,41,49,57],
[2,10,18,26,34,42,50,58],
[3,11,19,27,35,43,51,59],
[4,12,20,28,36,44,52,60],
[5,13,21,29,37,45,53,61],
[6,14,22,30,38,46,54,62],
[7,15,23,31,39,47,55,63]
];

$('h4').text(player1 + blueChip);

$('.gameButton').on('click', function(){
  for(i=0;i<col.length;i++){
    if(col[i].includes($('.gameButton').index(this))){
      var colIndex=i;
      for(p=(col.length-1);p>=0;p--){
        if($('.gameButton').eq(col[i][p]).css('background-color')==="rgb(255, 255, 255)"){
          if($('h4').text()===(player1 + blueChip)){
            $('.gameButton').eq(col[i][p]).css('background-color','blue');
            $('h4').text(player2 + redChip);
            currentColor=blueDescription;
          }else{
            $('.gameButton').eq(col[i][p]).css('background-color','red');
            $('h4').text(player1 + blueChip);
            currentColor=redDescription;
          }
          break;
        }
      }
    }
  }
  var flag=evaluateMove(p,colIndex,currentColor);
  if(flag===true){
    if(currentColor===blueDescription){
      $('h1').text(player1 + " has won the game!");
    }else if(currentColor===redDescription){
      $('h1').text(player2 + " has won the game!");
    }
    $('h2').text(" ");
    $('h4').text("Refresh browser to restart the game!");
    buttonDisable();
  }
});


function evaluateMove(rowIndex,columnIndex,color){
  var horizontal_count=0;
  var vertical_count=0;
  var diagonal_count_right=0;
  var diagonal_count_left=0;
  console.log("Row: " + rowIndex + "; Col: "+ columnIndex);
  var diagonalLeftCol=columnIndex;
  var diagonalLeftRow=rowIndex;

  var diagonalRightCol=columnIndex;
  var diagonalRightRow=rowIndex;
  var right=false;
  var left=false;

  var maxLength=col.length-1;

  while(right===false || left===false){
    if(right===false){
      if(diagonalRightCol<maxLength && diagonalRightRow<maxLength){
        diagonalRightRow++;
        diagonalRightCol++;
      }else {
        right=true;
        console.log("Right-col: " + diagonalRightCol + "; Right-row: "+diagonalRightRow);
      }
    }
    if(left===false){
      if(diagonalLeftCol>0 && diagonalLeftRow<maxLength){
        diagonalLeftCol--;
        diagonalLeftRow++;
      }else{
        left=true;
        console.log("Left-col: " + diagonalLeftCol + "; Left-row: "+diagonalLeftRow);
      }
    }
  }

  for(counter=maxLength;counter>=0;counter--){
    //Vertical
    if($('.gameButton').eq(col[columnIndex][counter]).css('background-color')===color){
      vertical_count++;
      if(vertical_count===4){
        console.log("GAME OVER")
        return true;
        break;
      }
    }else{
      vertical_count=0;
    }

    //Horizontal
    if($('.gameButton').eq(col[counter][rowIndex]).css('background-color')===color){
      horizontal_count++;
      if(horizontal_count===4){
        console.log('gameover')
        return true;
        break;
      }
    }else{
      horizontal_count=0;
    }

    //Diagonal
    if(diagonalLeftCol<=maxLength && diagonalLeftRow>=0){
      console.log("Run Left-col: " + diagonalLeftCol + "; Left-row: "+ diagonalLeftRow);
      if($('.gameButton').eq(col[diagonalLeftCol][diagonalLeftRow]).css('background-color')===color){
        diagonal_count_left++;
        if(diagonal_count_left===4){
          console.log("gameover");
          return true;
          break;
        }
      }else{
        diagonal_count_left=0;
      }
    }
    if(diagonalRightCol>=0 && diagonalRightRow>=0){
      console.log("Run Right-col: " + diagonalRightCol + "; Right-row: "+ diagonalRightRow);
      if($('.gameButton').eq(col[diagonalRightCol][diagonalRightRow]).css('background-color')===color){
        diagonal_count_right++;
        if(diagonal_count_right===4){
          console.log("gameover");
          return true;
          break;
        }
      }else{
        diagonal_count_right=0;
      }
    }
    diagonalLeftCol++;
    diagonalLeftRow--;
    diagonalRightCol--;
    diagonalRightRow--;

  }
  return false;
}

function buttonDisable(){
  $('.gameButton').attr("disabled", true);
}

$('#restartButton').on('click', function(){
  window.location.reload()
});

$('#helpButton').on('click', function(){
  alert("The objective is to connect four of your chips horizontaly, verticaly or diagonaly!");
});
