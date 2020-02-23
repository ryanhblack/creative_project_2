function loadFranchiseList() {
    const url = "https://records.nhl.com/site/api/franchise?include=teams.id&include=teams.active&include=teams.triCode&include=teams.placeName&include=teams.commonName&include=teams.fullName&include=teams.logos&include=teams.conference.name&include=teams.division.name&include=teams.franchiseTeam.firstSeason.id&include=teams.franchiseTeam.lastSeason.id&include=teams.franchiseTeam.teamCommonName";
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            let teamNames = [];
            for (let i = 0; i < json.data.length; i++) {
                let franchise = json.data[i];
                let teamId = json.data[i].mostRecentTeamId;
                let j = 0;
                for (j = 0; j < json.data[i].teams.length; ++j) {
                    if (franchise.teams[j].id == teamId) break;
                }
                teamNames.push([json.data[i].teams[j].fullName, json.data[i].id]);
            }
            teamNames.sort();
            let sortedTeamIds = [];
            for (let i = 0; i < teamNames.length; i++) {
                sortedTeamIds.push(teamNames[i][1]);
            }
            let table = "<table class=\"col-xs-12\"id=\"teams-table\">";
            let col = 0;
            for (let i = 0; i < sortedTeamIds.length; i++) {
                if (col > 5) col = 0;
                if (col == 0) table += "<tr>";
                let franchise = json.data[sortedTeamIds[i] - 1];
                let teamId = franchise.mostRecentTeamId;
                let j = 0;
                for (j = 0; j < franchise.teams.length; ++j) {
                    if (franchise.teams[j].id == teamId) {
                        break;
                    }
                }
                let team = franchise.teams[j];
                table += "<td><img src=\"";
                if (team.logos[0].background == "light") {
                    table += team.logos[0].url;
                } else {
                    table += team.logos[1].url;
                }
                table += "\" alt=\"";
                table += team.fullName + " logo";
                table += "\" title=\"";
                table += team.fullName;
                table += "\" onclick=\"";
                table += "loadFranchiseByID(" + json.data[sortedTeamIds[i] - 1].mostRecentTeamId;
                table += ", '" + team.fullName;
                table += "');\" /></td>";
                if (col == 5) table += "</tr>";
                col++;
            }
            document.getElementById("records").innerHTML = table;
            document.getElementById("franchise").innerHTML = "NHL Franchises"
            console.log(json);
        });
    return;
}

function loadFranchiseByID(id = 1, teamName = "") {
    const url = "https://records.nhl.com/site/api/franchise-detail?cayenneExp=mostRecentTeamId=" + id;

    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            let info = "<p style=\"cursor: pointer;\"onclick=\"loadFranchiseList();\"><span class=\"glyphicon glyphicon-arrow-left\"></span> Return to Franchise List</p>"
            let team = json.data[0]
            info += "<img class=\"hero-image\" alt=\"hero-image\" src=\"";
            info += team.heroImageUrl + "\" />";
            info += "<div style=\"text-align: center;\" class=\"col-xs-12\">";
            info += "<h3>Team Information</h3><hr />";
            let creationDate = new Date(team.dateAwarded);
            const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let dateString = month[creationDate.getMonth()] + " " + creationDate.getMonth() + ", " + creationDate.getFullYear();
            info += "<p><strong>Creation Date:</strong> " + dateString + "</p>"
            info += "<p><strong>First Season:</strong> " + Math.floor(team.firstSeasonId / 10000) + "-" + Math.ceil(team.firstSeasonId / 10000) + "</p>";
            if (team.directoryUrl != null) {
                info += "<p><strong>Staff Directory:</strong> <a href=\"" + team.directoryUrl + "\">" + team.directoryUrl + "</a></p>"
                info += "</div>";
                info += "<hr style=\"clear: both;\" />";
                info += "<div class=\"col-xs-12 col-md-6\">";
                info += "<h3>Captains</h3><hr />";
                info += team.captainHistory;
                info += "</div>";
                info += "<div class=\"col-xs-12 col-md-6\">";
                info += "<h3>Coaches</h3><hr />";
                info += team.coachingHistory;
                info += "</div>";
                info += "<hr style=\"clear: both;\" />";
                info += "<div class=\"col-xs-12 col-md-6\">";
                info += "<h3>Retired Numbers</h3><hr />";
                info += team.retiredNumbersSummary;
                info += "</div>";
                info += "<div class=\"col-xs-12 col-md-6\">";
                info += "<h3>General Managers</h3><hr />";
                info += team.generalManagerHistory;
                info += "</div>";
            } else {
                info += "<p>There is no additional data available for the " + teamName + " because they are no longer the the NHL</p>";
                info += "</div>";
            }
            info += "<hr style=\"clear: both;\" /><p style=\"cursor: pointer;\"onclick=\"loadFranchiseList();\"><span class=\"glyphicon glyphicon-arrow-left\"></span> Return to Franchise List</p>"
            document.getElementById("records").innerHTML = info;
            document.getElementById("franchise").innerHTML = teamName;
            console.log(team);
        });
    return;
}

window.addEventListener("load", function (event) {
    event.preventDefault();
    loadFranchiseList();
});
