class Reporting{
		
	log(code,id)
	{
		var eventS = '';
		var data = {};
		var timestmp = Math.round(+new Date()/1000);
		var fs = require("fs");
		switch(code) {
			case 1:
				eventS = "Added Client";
				data = {event: eventS, timestamp: timestmp, clientID: id, accountID: -1, type: "-1", amount: -1};
				break;
			case 2:
				eventS = "Client Accounts Requested";
				data = {event: eventS, timestamp: timestmp, clientID: id, accountID: -1, type: "-1", amount: -1};
				break;
			case 3:
				eventS = "Account Balance Requested";
				data = {event: eventS, timestamp: timestmp, clientID: -1, accountID: id, type: "-1", amount: -1};
				break;
			case 4:
				eventS = "Mini Statement Requested";
				data = {event: eventS, timestamp: timestmp, clientID: -1, accountID: id, type: "-1", amount: -1};
				break;
			case 8:
				eventS = "Client Deactivation Requested by CIS";
				data = {event: eventS, timestamp: timestmp, clientID: id, accountID: -1, type: "-1", amount: -1};
				break;
			case 9:
				eventS = "Client Reactivation Requested by CIS";
				data = {event: eventS, timestamp: timestmp, clientID: id, accountID: -1, type: "-1", amount: -1};
				break;
		}
		
		this.saveEvent(data);
	}
	
	log(code,id,amnt)
	{
		var eventS = '';
		var data = {};
		var timestmp = Math.round(+new Date()/1000);
		var fs = require("fs");
		switch(code) {
			case 5:
				eventS = "Withdrawel";
				data = {event: eventS, timestamp: timestmp, clientID: -1, accountID: id, type: "-1", amount: amnt};
				break;
			case 6:
				eventS = "Deposit";
				data = {event: eventS, timestamp: timestmp, clientID: -1, accountID: id, type: "-1", amount: amnt};
				break;
		}
		this.saveEvent(data);
	}
	
	log(code,cID,aID,typ)
	{
		var eventS = '';
		var data = {};
		var timestmp = Math.round(+new Date()/1000);
		var fs = require("fs");
		eventS = "Client Account Created";
		data = {event: eventS, timestamp: timestmp, clientID: cID, accountID: aID, type: typ, amount: -1};
		this.saveEvent(data);
	}
	
	postToRepSubSystem(numLines)
	{
		console.log("Posting Log Report to REP Sub System");
		var lines;
		var obj = [];
		
		var fs = require("fs");
		var dat = fs.readFileSync('Report.txt');
			
                lines = dat.toString().split('\n');
		var i;
		for(i = 0; i < 5; i++)
		{
                        lines[i].substr(0,lines[i].length - 1)
                        console.log(lines[i]);
			var dataL = JSON.parse(lines[i]);
			obj.push(dataL);
		}
		
		//post to reporting sub system
		
		const axios = require('axios');
		
		axios.post('https://fnbreports-6455.nodechef.com/api', {
			system: 'CAS',
			data: JSON.stringify(obj)
		})
		.then((res) => {
			console.log('statusCode: ${res.statusCode}')
			console.error(res)
		})
		.catch((error) => {
			console.error(error)
		})
		
		console.log('Log Posted');
                
                fs.unlink('Report.txt', function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
	}
	
	saveEvent(data)
	{
		var numLines = 0;
		var dataS = JSON.stringify(data)+"\n";
                var fs = require("fs");
		fs.appendFileSync('Report.txt',dataS, (err) => {
			if (err) throw err;
		})
                
                console.log('Logged an event in Report.txt');
		
                var tmp = 0;
                
		var dat = fs.readFileSync('Report.txt');
                
                numLines = dat.toString().split('\n').length-1;
                
		if(numLines >= 5)
		{
			this.postToRepSubSystem(numLines);
		}
	}
}

module.exports = Reporting;
