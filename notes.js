// console.log("starting notes app");
// console.log(module);
// module.exports.addNote=function(){
// 	title:"task1",
// 	aim:"finish it";
// // };
// module.exports.age=21;
// module.exports.addNote=()=>{
// 	console.log("add note");
// 	return 'Newsnote';
// }
const fs=require('fs');
var fetchNotes=()=>{
try{
	var notesString=fs.readFileSync('notes-data.json');
	return JSON.parse(notesString);		
	}catch(e){
		return [];
	}
};
var saveNotes=(notes)=>{
fs.writeFileSync("notes-data.json",JSON.stringify(notes));
}; 
var addNote=(title,body)=>{
	var notes=fetchNotes();
	var note={
		title,
		body
	};
	// filter is an array method it returns true or false	 
	// var duplicateNotes=notes.filter((note)=>{
	// 	return note.title===title;
	// })
	// // if title are same then it wil  be added in duplicate notes else not
	var duplicateNotes=notes.filter((note)=>note.title===title);
	if(duplicateNotes.length===0){
	notes.push(note);
	saveNotes(notes);
	return note;
	}
};
 var getAll=()=>{
// 	// notes.forEach(function(note){
// 	// 	console.log(note);
	return fetchNotes();
 };
var getNote=(title)=>{
	var notes=fetchNotes();
	var commonnote=notes.filter((note)=>note.title===title)
	return commonnote[0];
	console.log("Required Note",title);
};
var removeNote=(title)=>{
	var notes=fetchNotes();
	var filteredNotes=notes.filter((note)=>note.title !== title);
	console.log(filteredNotes);
	saveNotes(filteredNotes);
	return notes.length!==filteredNotes.length;
	// console.log("Removing",title);
};
var lognotes=(note)=>{
	debugger;
		console.log("------")
		console.log(`Title:${note.title}`);
		console.log(`Body:${note.body}`);
}
// ES6 syntax
module.exports={
	addNote,
	getAll,
	getNote,
	removeNote,
	lognotes
}