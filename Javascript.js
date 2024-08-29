function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const correctUsername = 'Lebo';
    const correctPassword = 'Lebo123'; // Replace with the actual password

    if (username == 'Lebo' && password == 'Lebo123') {
        alert('Welcome Lebo!!💕');
        setTimeout(function() {
            window.location.href = 'lebo.html'; // Replace with the actual page you want to redirect to
        }, 2000); // 2-second delay before redirecting
    }
     else if (username == 'Thando' && password == 'Thando123') {
        alert('Welcome Thando!!💕');
        setTimeout(function(){
            window.location.href='Thando.html';
        }, 2000);
    }
    else if(username=='Nqobile' && password== 'Nqobile123'){
        alert('Welcome Nqobile!!💕');
        setTimeout(function(){
            window.location.href='Nqobile.html';
        }, 2000);
    }
    else if(username=='Gcina' && password== 'Gcina'){
        alert('Welcome Gcina!!💕');
        setTimeout(function(){
            window.location.href='Gcina.html';
        }, 2000);
    }
    else if(username=='Liyanda' && password== 'Liyanda'){
        alert('Welcome Liyanda!!💕');
        setTimeout(function(){
            window.location.href='Liyanda.html';
        }, 2000);
    }
     else if(username == 'IT' && password == 'Test') {
        alert('TESTED!!👨🏽‍💻⚙️');
        setTimeout(function(){
            window.location.href='IT_ADMIN.html';
        }, 2000);
    }
     else {
        alert('Incorrect username or password. Please try again.');
    }
}
function skipLogin() {
    window.location.href = 'Public.html'; // Replace with the actual page for visitors
}


// Optionally, you can automatically show the login popup when the page loads
window.onload = function() {
    document.getElementById('loginPopup').style.display = 'flex';
};

// Function to load data based on selected project
function loadProjectData(projectId) {
    const data = projectData[projectId];
    if (data) {
        // Update table data
        document.getElementById('progressCompleted').innerText = `${data.progress.completed}%`;
        document.getElementById('progressRemaining').innerText = `${data.progress.remaining}%`;
        document.getElementById('progressTotal').innerText = `${data.progress.total}%`;
        
        document.getElementById('paymentsCompleted').innerText = `R ${data.payments.completed}`;
        document.getElementById('paymentsRemaining').innerText = `R ${data.payments.remaining}`;
        document.getElementById('paymentsTotal').innerText = `R ${data.payments.total}`;
        
        document.getElementById('performanceCompleted').innerText = `${data.performance.completed}%`;
        document.getElementById('performanceRemaining').innerText = `${data.performance.remaining}%`;
        document.getElementById('performanceTotal').innerText = `${data.performance.total}%`;
        
        document.getElementById('totalLearnersCompleted').innerText = `${data.learners.completed}`;
        document.getElementById('totalLearnersRemaining').innerText = `${data.learners.remaining}`;
        document.getElementById('totalLearnersTotal').innerText = `${data.learners.total}`;
        
        document.getElementById('totalDropoutsCompleted').innerText = `${data.dropouts.completed}`;
        document.getElementById('totalDropoutsRemaining').innerText = `${data.dropouts.remaining}`;
        document.getElementById('totalDropoutsTotal').innerText = `${data.dropouts.total}`;
        
        // Update chart data (if needed)(using chart.js)
        updateChart(data);
    }
}


// Function to get data from existing charts
function getChartData(projectId) {
    let progressCompleted, progressRemaining, paymentsCompleted, paymentsRemaining, performanceCompleted, performanceRemaining, learners, dropouts;
    
    switch (projectId) {
        case 'project1':
        
            break;
        case 'project2':
        
        }
        
        return {
            progress: { completed: progressCompleted, remaining: progressRemaining, total: progressCompleted + progressRemaining },
            payments: { completed: paymentsCompleted, remaining: paymentsRemaining, total: paymentsCompleted + paymentsRemaining },
            performance: { completed: performanceCompleted, remaining: performanceRemaining, total: performanceTotal },
            learners: {completed: totalLearnersInput, remaining:0, total:0},
            dropouts: {completed: totalDropoutsInput*2, remaining:totalDropoutsInput, total:totalDropoutsInput }
        };
    }
    // Sample data for projects
    const projectData = {
        project1: {
            progress: { completed: 20, remaining: 80, total: 100 },
            payments: { completed: 15000, remaining: 25000, total: 40000 },
            performance: { completed: 60, remaining: 40, total: 100 },
            learners: {completed: 80, remaining: 20, total:100},
            dropouts: {completed: 10, remaining:4, total:14}
        },
        project2: {
            progress: { completed: 30, remaining: 70, total: 100 },
            payments: { completed: 15000, remaining: 25000, total: 50000 },
            performance: { completed: 60, remaining: 40, total: 100 },
            learners: {completed: 70, remaining: 30, total:100},
            dropouts: {completed: 5, remaining:4, total:9}
        },
        project3: {
            progress: { completed: 40, remaining: 60, total: 100 },
            payments: { completed: 20000, remaining: 30000, total: 50000 },
            performance: { completed: 70, remaining: 30, total: 100 },
            learners: {completed: 95, remaining: 5, total:100},
            dropouts: {completed: 0, remaining:4, total:4}
        },
        project4: {
            progress: { completed: 50, remaining: 50, total: 100 },
            payments: { completed: 25000, remaining: 35000, total: 50000 },
            performance: { completed: 80, remaining: 20, total: 100 },
            learners: {completed: 75, remaining: 25, total:100},
            dropouts: {completed: 4, remaining:2, total:6}
        },
        project5: {
            progress: { completed: 60, remaining: 40, total: 100 },
            payments: { completed: 30000, remaining: 40000, total: 70000 },
            performance: { completed: 90, remaining: 10, total: 100 },
            learners: {completed: 20, remaining: 80, total:100},
            dropouts: {completed: 9, remaining:2, total:11}
        },
        project6: {
            progress: { completed: 70, remaining: 30, total: 100 },
            payments: { completed: 35000, remaining: 45000, total: 50000 },
            performance: { completed: 95, remaining: 5, total: 100 },
            learners: {completed: 100, remaining: 0, total:100},
            dropouts: {completed: 4, remaining:0, total:4}
        },
        project7: {
            progress: { completed: 80, remaining: 20, total: 100 },
            payments: { completed: 40000, remaining: 50000, total: 50000 },
            performance: { completed: 100, remaining: 0, total: 100 },
            learners: {completed: 94, remaining: 6, total:100},
            dropouts: {completed: 5, remaining:1, total:6}
        },
        // Add more projects as needed
    };
    
    // Function to update the chart based on project data
function updateChart(data) {
    const ctx = document.getElementById('detailsChart').getContext('2d');
    new Chart(ctx, {
        type: currentChartType, // Use the current chart type
        data: {
            labels: ['Progress', 'Outstanding Payments', 'Performance'],
            datasets: [{
                label: 'Completed',
                data: [data.progress.completed, data.payments.completed, data.performance.completed],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }, {
                label: 'Remaining',
                data: [data.progress.remaining, data.payments.remaining, data.performance.remaining],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Event listener to load data on dropdown change
document.getElementById('projects').addEventListener('change', function () {
    loadProjectData(this.value);
});

// Default chart type
let currentChartType = 'bar';

// Event listener for chart type change
function changeChartType(type) {
    currentChartType = type;
    const selectedProject = document.getElementById('projects').value;
    loadProjectData(selectedProject); // Reload the chart with the new type
}

// Load data for the first project on page load
window.onload = () => {
    loadProjectData('projects');
};
