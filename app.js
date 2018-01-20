//Basics of require statment and lodash
 // console.log("starting app");
// // const fs=require('fs');
// // const os=require('os');
// // const notes=require('./notes.js');
// const _=require('lodash');
//  console.log(_.isString(true));
//  console.log(_.isString('Asim'));
//  // To print unique elements removes duplicate entries
// var filteredArray=_.uniq(['mike',15,1,2,3,1,'Asim','edge',true]);
// console.log(filteredArray); 
// // var user=os.userInfo();
//  // var res=notes.addNote();
// //  console.log(res);
// // // console.log(res.title);
// // console.log(res.aim);
// // console.log(user);
// // fs.appendFileSync('greetings.txt','Hello'+user.username);
// // fs.appendFileSync('greetings.txt',`Hello ${user.username}! You are ${notes.age}`);
// console.log("Starting notesapp.js");
const fs=require('fs');
const _=require('lodash');
// Process of parsing argument becomes much easier with yargs
const yargs=require('yargs');
const notes=require('./notes.js')
const titleOption={
				describe:"Title of note",
				demand:true,
				alias:'t'
}
const bodyOption={
				describe:"Body of note",
				demand:true,
				alias:'b'
}
const argv=yargs
		.command('add',"Add a new note",{
			title:titleOption,
			body:bodyOption
			})
		.command('list',"List all notes")
		.command('read',"Read a note",{
			title:titleOption
		})
		.command('remove',"Remove a note",{
		title:titleOption	
		})
		.help()
		.argv;
// var command=process.argv[2];
 var command=argv._[0];
 // console.log('Process',process.argv);
// console.log('Yargs',argv);
// console.log("Command:",command);
if(command=='add'){
	// console.log("adding new note")
	var note=notes.addNote(argv.title,argv.body);
	if(note){
		console.log("Note created");
		notes.lognotes(note);
	}else{
		console.log("Note title taken");
	}
}else if(command=="list"){
	var allnote=notes.getAll();
	console.log(`Printing ${allnote.length} note(s)`)
	allnote.forEach((note)=>notes.lognotes(note));
	
}else if(command=="read"){

	var note=notes.getNote(argv.title);
	if(note)
	{
	console.log("Note Read")
	notes.lognotes(note);
	}else{
		console.log("Note not found");
	}
}
else if(command=="remove"){
	console.log("Removing note");
	var noteRemoved=notes.removeNote(argv.title);
	var message=noteRemoved?'Note was removed':'Note not found';
	console.log(message);

}
else{
	console.log("command not recognised");
}