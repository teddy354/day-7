let data = [];

function addData(event) {
    event.preventDefault(); // sreach
    let project_name = document.getElementById("project_name").value;
    let startDate = new Date(document.getElementById("start_date").value);
    let endDate = new Date(document.getElementById("end_date").value);
    let description = document.getElementById("description").value;
    let image_input = document.getElementById("image").files;

    if (project_name == "") {
        return alert("Project Name NOT FOUND");
    } else if (isNaN(startDate)) {
        return alert("Start Date NOT FOUND");
    } else if (isNaN(endDate)) {
        return alert("End Date NOT FOUND");
    } else if (description == "") {
        return alert("Description NOT FOUND");
    } else if (image_input.length == 0) {
        return alert("Image NOT FOUND");
    }

    image = URL.createObjectURL(image_input[0]);

    let project_item = {
        project_name,
        startDate,
        endDate,
        description,
        image,
    };
    data.push(project_item);
    renderProject();
}

function renderProject() {
    document.getElementById("project_list").innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        document.getElementById("project_list").innerHTML += `<div>
							<div>
								<img
									src="${data[i].image}"
									alt="Image"
									class="image"
								/>
							</div>
							<h3>${data[i].project_name}</a>
							</h3>
							<span>${distanceDay(data[i].endDate, data[i].startDate)}</span>
							<p>${data[i].description}</p>
							<div>
								<a  href="#!" 
									>Edit</a
								>
								<a  href="#!" 
									>Delete</a
								>
							</div>
						</div>`;
    }
}
function distanceDay(endDate, startDate) {
    let distance = endDate - startDate;

    let distanceMonth = Math.floor(distance / 1000 / 60 / 60 / 24 / 30);
    let distanceDay = Math.floor(distance / 1000 / 60 / 60 / 24);

    if (distanceMonth > 0) {
        if (distanceDay % 30 >= 1) {
            return `${distanceMonth} month ${distanceDay % 30} days`;
        }
        return `${distanceMonth} month`;
    } else if (distanceDay > 0) {
        return `${distanceDay} days`;
    } else {
        return `0 days`;
    }
}
