document.addEventListener('DOMContentLoaded', function() {
    
  const circleDropdown = document.getElementById('circle_dropdown');
  const divisionDropdown = document.getElementById('division_dropdown');
  const subdivisionDropdown = document.getElementById('subdivision_dropdown');

  circleDropdown.addEventListener('change', function() {
      const selectedCircleId = circleDropdown.value;
      console.log(selectedCircleId)
      fetch(`/get_divisions/?circle_id=${selectedCircleId}`)
          .then(response => response.json())
          .then(data => {
              divisionDropdown.innerHTML = '';

              for (const division of data) {
                  const option = document.createElement('option');
                  option.value = division.DIVISIONNAME;
                  console.log(option.value)
                  option.textContent = division.DIVISIONNAME;
                  divisionDropdown.appendChild(option);
              }
          })
          .catch(error => console.error("Fetch error agaya bhai:(",error));
  });
  divisionDropdown.addEventListener('change', function() {
    const selectedDivisionName = divisionDropdown.value;

    // Debugging: Log the selectedDivisionName to check its value
    console.log('Selected Division Name:', selectedDivisionName);

    if (selectedDivisionName) {  // Ensure a valid division name is selected
        fetch(`/get_subdivisions/?division_name=${selectedDivisionName}`)
            .then(response => response.json())
            .then(data => {
                // Clear existing options
                subdivisionDropdown.innerHTML = '';

                // Populate the Subdivision dropdown with fetched data
                data.forEach(subdivision => {
                    const option = document.createElement('option');
                    option.value = subdivision.SUB_DIVISION_DESC;
                    option.textContent = subdivision.SUB_DIVISION_DESC;
                    subdivisionDropdown.appendChild(option);
                });
            })
            .catch(error => console.error("Fetch error:", error));
    }
});
});
    //--------------------------------------------------submit button---------------------------

    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("submitBtn").addEventListener("click", function () {
            // Collect form data
            var empId = document.getElementById("usernameInput").value;
            var circleId = document.getElementById("circle_dropdown").value;
            var divisionId = document.getElementById("division_dropdown").value;
            var wardNo = document.getElementById("ward_id").value;
            var meetingHost = document.getElementById("host_id").value;
            var issueType = document.getElementById("issuetype_id").value;
            var brplView = document.getElementById("brplview_id").value;
            var targetDate = document.getElementById("dateInput").value;
            var subDivision = document.getElementById("subdivision_dropdown").value;
            var issueRaisedBy = document.getElementById("issueraised_id").value;
            var counselor = document.getElementById("counselor_id").value;
            var meetingDate = document.getElementById("meetingdate_id").value;
            var meetingAttendees = document.getElementById("attended_id").value;
            var description = document.getElementById("description_id").value;
            var actionPlan = document.getElementById("actionplan_id").value;
    
            // Create a FormData object to include file uploads
            var formData = new FormData();
            
            // Collect form data and append it to the FormData object
            formData.append("empname", empId);
            formData.append("circleId", circleId);
            formData.append("divisionId", divisionId);
            formData.append("wardNo", wardNo);
            formData.append("meetingHost", meetingHost);
            formData.append("issueType", issueType);
            formData.append("brplView", brplView);
            formData.append("targetDate", targetDate);
            formData.append("subDivision", subDivision);
            formData.append("issueRaisedBy", issueRaisedBy);
            formData.append("counselor", counselor);
            formData.append("meetingDate", meetingDate);
            formData.append("meetingAttendees", meetingAttendees);
            formData.append("description", description);
            formData.append("actionplan", actionPlan);
            
            // Append the file input element to FormData (if a file is selected)
            var fileInput = document.getElementById("file_id");
            if (fileInput.files.length > 0) {
                formData.append("file", fileInput.files[0]);
            }
            
            // Send data to the server using AJAX
            $.ajax({
                type: "POST",
                url: "{% url 'upload_form' %}", // Replace with your Django URL
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    alert(response);  // Display a success message
                },
                error: function () {
                    alert("An error occurred.");  // Display an error message
                }
            });
        });
    });
    














   
