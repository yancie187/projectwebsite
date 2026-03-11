const CLOUD_NAME = "djyk9infv";
const UPLOAD_PRESET = "media_upload";

const gallery = document.getElementById("gallery");


// Upload File
async function uploadFile(){

const file = document.getElementById("fileInput").files[0];

if(!file){
alert("Select a file");
return;
}

const formData = new FormData();
formData.append("file", file);
formData.append("upload_preset", UPLOAD_PRESET);

const response = await fetch(
`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
{
method:"POST",
body:formData
});

const data = await response.json();

displayFile(data.secure_url, file.type, data.public_id);

}


// Show file in gallery
function displayFile(url,type,publicId){

let div=document.createElement("div");
div.className="media-item";

let deleteBtn=document.createElement("button");
deleteBtn.innerText="✖";
deleteBtn.className="delete-btn";

deleteBtn.onclick=()=>deleteFile(publicId,div);

div.appendChild(deleteBtn);


if(type.startsWith("image")){

let img=document.createElement("img");
img.src=url;
img.onclick=()=>openViewer(url,"image");

div.appendChild(img);

}else{

let video=document.createElement("video");
video.src=url;
video.onclick=()=>openViewer(url,"video");

div.appendChild(video);

}

gallery.appendChild(div);

}


// Delete file
async function deleteFile(publicId, element){

const response = await fetch("http://localhost:3000/delete", {

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
public_id: publicId
})

});

const result = await response.json();

if(result.result === "ok"){

element.remove();

alert("Deleted successfully");

}else{

alert("Delete failed");

}

}

// Viewer popup
function openViewer(url,type){

const viewer=document.getElementById("viewer");
const content=document.getElementById("viewerContent");

content.innerHTML="";

if(type==="image"){

let img=document.createElement("img");
img.src=url;
content.appendChild(img);

}else{

let video=document.createElement("video");
video.src=url;
video.controls=true;
video.autoplay=true;
content.appendChild(video);

}

viewer.classList.remove("hidden");

}


document.getElementById("closeViewer").onclick=()=>{
document.getElementById("viewer").classList.add("hidden");
};


// Logout
function logout(){
window.location.href="index.html";
}