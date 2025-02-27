const output = document.querySelector("#output");
const getJobsButton = document.querySelector("#get-jobs-btn");
const addJobButton = document.querySelector("#add-job-form");

async function showJobs() {
    try {
        const res = await fetch("http://localhost:8000/customers/CustomerID/job");
        if (!res.ok) {
            throw new Error("unable to fetch jobs");
        }
        const jobs = await res.json()
        output.innerHTML = "";

        jobs.forEach(element => {
            const jobElement = document.createElement("div");
            jobElement.textContent = `${element.title}-${element.company}`;
            output.appendChild(jobElement);
        });
    } catch (error) {
        console.log("Failed to load Jobs", error);
    }
}

getJobsButton.addEventListener("click", showJobs);

async function addNewJob(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const title = formData.get('title');
    const company = formData.get('company');
    const location = formData.get('location');
    try {
        const res = await fetch("http://localhost:8000/customers/customerID/job", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, company, location })
        })

        if (!res.ok) {
            throw new Error("Failed to add job");

        }
        const newJob = await res.json();
        const jobElement = document.createElement("div");
        jobElement.textContent = `${newJob.title}-${newJob.company}`;
        output.appendChild(jobElement);
        showJobs();
    } catch (error) {
        console.log("Error Adding the post")
    }
}

addJobButton.addEventListener("submit", addNewJob);

