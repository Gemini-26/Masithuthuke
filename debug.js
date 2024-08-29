document.addEventListener('DOMContentLoaded', () => {
    const ctxProgress = document.getElementById('progressChart').getContext('2d');
    const ctxPayments = document.getElementById('paymentsChart').getContext('2d');
    const ctxPerformance = document.getElementById('performanceChart').getContext('2d');

    let progressChart = createChart(ctxProgress, 'Progress', 'pie');
    let paymentsChart = createChart(ctxPayments, 'Payments', 'pie');
    let performanceChart = createChart(ctxPerformance, 'Performance', 'pie');

    let projectData = {
        'project1': { 
            progress: [20, 80], 
            payments: [10000, 20000], 
            performance: [50, 50], 
            risks: [], 
            siteVisits: [], 
            riskComments: [], 
            visitComments: []
        },
        'project2': { 
            progress: [30, 70], 
            payments: [15000, 25000], 
            performance: [60, 40], 
            risks: [], 
            siteVisits: [], 
            riskComments: [], 
            visitComments: []
        },
        'project3': { 
            progress: [40, 60], 
            payments: [20000, 30000], 
            performance: [70, 30], 
            risks: [], 
            siteVisits: [], 
            riskComments: [], 
            visitComments: []
        },
        'project4': { 
            progress: [50, 50], 
            payments: [25000, 35000], 
            performance: [80, 20], 
            risks: [], 
            siteVisits: [], 
            riskComments: [], 
            visitComments: []
        },
        'project5': { 
            progress: [60, 40], 
            payments: [30000, 40000], 
            performance: [90, 10], 
            risks: [], 
            siteVisits: [], 
            riskComments: [], 
            visitComments: []
        },
        'project6': { 
            progress: [70, 30], 
            payments: [35000, 45000], 
            performance: [95, 5], 
            risks: [], 
            siteVisits: [], 
            riskComments: [], 
            visitComments: []
        },
        'project7': { 
            progress: [80, 20], 
            payments: [40000, 50000], 
            performance: [100, 0], 
            risks: [], 
            siteVisits: [], 
            riskComments: [], 
            visitComments: []
        }
    };

    // Load data from local storage if available
    if (localStorage.getItem('projectData')) {
        projectData = JSON.parse(localStorage.getItem('projectData'));
    }

    // Event listener for project selection
    document.getElementById('projects').addEventListener('change', (event) => {
        const projectName = event.target.value;
        if (projectData[projectName]) {
            // Update charts with selected project data
            updateChartData(progressChart, projectData[projectName].progress, 'Progress (%)');
            updateChartData(paymentsChart, projectData[projectName].payments, 'Outstanding Payments (R)');
            updateChartData(performanceChart, projectData[projectName].performance, 'Performance/Deliverables (%)');

            // Update amount texts
            document.getElementById('progressAmount').textContent = `Total Expected: ${projectData[projectName].progress[0] + projectData[projectName].progress[1]}%`;
            document.getElementById('paymentsAmount').textContent = `Total Expected: R${projectData[projectName].payments[0] + projectData[projectName].payments[1]}`;
            document.getElementById('performanceAmount').textContent = `Total Expected: ${projectData[projectName].performance[0] + projectData[projectName].performance[1]}%`;

            // Populate update form with existing data
            document.getElementById('progressExpected').value = projectData[projectName].progress[1] + projectData[projectName].progress[0];
            document.getElementById('progressReceived').value = projectData[projectName].progress[0];
            document.getElementById('paymentsExpected').value = projectData[projectName].payments[1] + projectData[projectName].payments[0];
            document.getElementById('paymentsReceived').value = projectData[projectName].payments[0];
            document.getElementById('risks').value = projectData[projectName].risks.length;
            document.getElementById('riskComments').value = projectData[projectName].riskComments.join(', ');
            document.getElementById('performanceExpected').value = projectData[projectName].performance[1] + projectData[projectName].performance[0];
            document.getElementById('performanceReceived').value = projectData[projectName].performance[0];
            document.getElementById('siteVisits').value = projectData[projectName].siteVisits.length;
            document.getElementById('visitComments').value = projectData[projectName].visitComments.join(', ');
            document.getElementById('LearnersExpected').value= projectData[projectName].LearnersExpected[1]+projectData[projectName].LearnersExpected[0];


            // Update risks and site visits table
            updateRiskTable(projectName);
            updateSiteVisitTable(projectName);
        }
    });

    // Function to update dashboard data
    window.updateDashboard = function() {
        const projectName = document.getElementById('projects').value;

        // Update progress data
        const progressExpected = parseInt(document.getElementById('progressExpected').value) || 0;
        const progressReceived = parseInt(document.getElementById('progressReceived').value) || 0;
        projectData[projectName].progress = [progressReceived, progressExpected - progressReceived];

        // Update payments data
        const paymentsExpected = parseInt(document.getElementById('paymentsExpected').value) || 0;
        const paymentsReceived = parseInt(document.getElementById('paymentsReceived').value) || 0;
        projectData[projectName].payments = [paymentsReceived, paymentsExpected - paymentsReceived];

        // Update performance data
        const performanceExpected = parseInt(document.getElementById('performanceExpected').value) || 0;
        const performanceReceived = parseInt(document.getElementById('performanceReceived').value) || 0;
        projectData[projectName].performance = [performanceReceived, performanceExpected - performanceReceived];

        // Update risks and site visits data
        const risksCount = parseInt(document.getElementById('risks').value) || 0;
        const riskComments = document.getElementById('riskComments').value.split(',').map(comment => comment.trim());
        projectData[projectName].risks = new Array(risksCount).fill(null);
        projectData[projectName].riskComments = riskComments;

        const siteVisitsCount = parseInt(document.getElementById('siteVisits').value) || 0;
        const visitComments = document.getElementById('visitComments').value.split(',').map(comment => comment.trim());
        projectData[projectName].siteVisits = new Array(siteVisitsCount).fill(null);
        projectData[projectName].visitComments = visitComments;

        //update learners
        const LearnersExpected = parseInt(document.getElementById('paymentsExpected').value) || 0;
        
        // Save data to local storage
        localStorage.setItem('projectData', JSON.stringify(projectData));

        // Update the risks and site visits table
        updateRiskTable(projectName);
        updateSiteVisitTable(projectName);

        // Display success message
        alert('Updated');
    };

    // Function to create a new Chart instance
    function createChart(ctx, label, type) {
        return new Chart(ctx, {
            type: type,
            data: {
                labels: ['Completed', 'Remaining'],
                datasets: [{
                    label: label,
                    data: [0, 0],
                    backgroundColor: [
                        'rgba(41, 255, 76)',
                        'rgba(255, 48, 48)'
                    ],
                    borderColor: [
                        'rgba(0, 0, 0)',
                        'rgba(0, 0, 0)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Function to update Chart data
    function updateChartData(chart, data, label) {
        chart.data.datasets[0].data = data;
        chart.data.datasets[0].label = label;
        chart.update();
    }

    // Function to update the risks table
    function updateRiskTable(projectName) {
        const tableBody = document.querySelector('#riskTable tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        // Add rows for risks
        projectData[projectName].riskComments.forEach((comment, index) => {
            const riskRow = `
                <tr>
                    <td>Risk ${index + 1}</td>
                    <td><input type="text" id="riskComment${index}" value="${comment || ''}"></td>
                    <td><button onclick="deleteRisk(${index}, '${projectName}')">⛔</button></td>
                </tr>
            `;
            tableBody.innerHTML += riskRow;
        });
    }

    // Function to update the site visits table
    function updateSiteVisitTable(projectName) {
        const tableBody = document.querySelector('#siteVisitTable tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        // Add rows for site visits
        projectData[projectName].visitComments.forEach((comment, index) => {
            const visitRow = `
                <tr>
                    <td>Visit ${index + 1}</td>
                    <td><input type="text" id="visitComment${index}" value="${comment || ''}"></td>
                    <td><button onclick="deleteSiteVisit(${index}, '${projectName}')">⛔</button></td>
                </tr>
            `;
            tableBody.innerHTML += visitRow;
        });
    }

    // Function to delete a risk entry
    window.deleteRisk = function(index, projectName) {
        projectData[projectName].riskComments.splice(index, 1);
        projectData[projectName].risks.splice(index, 1); // Adjust array length
        updateRiskTable(projectName);

        // Save data to local storage
        localStorage.setItem('projectData', JSON.stringify(projectData));
    };

    // Function to delete a site visit entry
    window.deleteSiteVisit = function(index, projectName) {
        projectData[projectName].visitComments.splice(index, 1);
        projectData[projectName].siteVisits.splice(index, 1); // Adjust array length
        updateSiteVisitTable(projectName);

        // Save data to local storage
        localStorage.setItem('projectData', JSON.stringify(projectData));
    };

    // Function to change the chart type
    window.changeChartType = function(type) {
        progressChart.destroy();
        paymentsChart.destroy();
        performanceChart.destroy();
        
        progressChart = createChart(ctxProgress, 'Progress', type);
        paymentsChart = createChart(ctxPayments, 'Payments', type);
        performanceChart = createChart(ctxPerformance, 'Performance', type);
        
        const projectName = document.getElementById('projects').value;
        updateChartData(progressChart, projectData[projectName].progress, 'Progress (%)');
        updateChartData(paymentsChart, projectData[projectName].payments, 'Outstanding Payments (R)');
        updateChartData(performanceChart, projectData[projectName].performance, 'Performance/Deliverables (%)');
    };

    // Initial load for the first project
    const initialProject = document.getElementById('projects').value;
    updateRiskTable(initialProject);
    updateSiteVisitTable(initialProject);
    updateChartData(progressChart, projectData[initialProject].progress, 'Progress (%)');
    updateChartData(paymentsChart, projectData[initialProject].payments, 'Outstanding Payments (R)');
    updateChartData(performanceChart, projectData[initialProject].performance, 'Performance/Deliverables (%)');

    document.getElementById('progressAmount').textContent = `Total Expected: ${projectData[initialProject].progress[0] + projectData[initialProject].progress[1]}%`;
    document.getElementById('paymentsAmount').textContent = `Total Expected: R${projectData[initialProject].payments[0] + projectData[initialProject].payments[1]}`;
    document.getElementById('performanceAmount').textContent = `Total Expected: ${projectData[initialProject].performance[0] + projectData[initialProject].performance[1]}%`;
});

