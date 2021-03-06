console.log("Boldify is running");

let paragraphs = document.getElementsByTagName("p");

for (elt of paragraphs){
  const result = elt.innerHTML;
  new_text = ""
  element = false


function boldify(value){
  punctuation = ""
  plural = ""
  first_letter = ""
  text = ""

  // get all things with tags get through
  if(value.includes("<")){
    element = true
  }
  if(element){

    new_text += value + " "
    if(value.includes("/") && value.includes(">")){
      element = false
    }
  }
  else{ //normal text remove endings first
    if(value.includes(",")){
         tmp = value.split(",")
         value =tmp[0]
         punctuation = "," + tmp[1]
       }
    if(value.includes(".")){
            tmp = value.split(".")
            value =tmp[0]
            punctuation = "," + tmp[1]
        }
    if(value[value.length-1] === "s"){
         value = value.slice(0, value.length-1);
         plural = "s"
       }
    //get first letter to keep upper case
    first_letter = value.charAt(0)
    value = value.toLowerCase()
    if(hyphDict[value]){ // word can be hyphenated
      let hyphtext = hyphDict[value];
      let rest = "";
      split_text = hyphtext.split("-");
      for (i = 1; i < split_text.length; i++){
          //glue syllables after the first togehter
          rest += split_text[i];
        }

      // make first syllable bold
      text = "<b>" + first_letter
          + split_text[0].slice(1) + "</b>" + rest;
      }
    else { //not in hyphenation dict only boldify words longer as 3 chars

      if(value.length > 3){
        if(value.slice(0,2) == "th"){ // special case th
          text = "<b>" + first_letter + value.slice(1,2) + "</b>"
                + value.slice(2) ;
      }else {
        text = "<b>" + first_letter + "</b>" + value.slice(1);
      }
    }else { //shorter words as 3 chars pass
        text = first_letter  + value.slice(1);
      }
    }
  //add bold parts to the removed parts
  new_text += text + plural + punctuation + " "
 }
}

  const items = result.split(" ");
  items.forEach(boldify);
  elt.innerHTML = new_text
}
