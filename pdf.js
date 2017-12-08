function PDF24Doc(params) {
	this.elements = new Array();
	this.params = params ? params : new Object();
}
PDF24Doc.prototype.setParam = function(paramKey, paramValue) {
	this.params[paramKey] = paramValue;
}
PDF24Doc.prototype.getParam = function(paramKey) {
	return this.params[paramKey];
};
PDF24Doc.prototype.setParams = function(params) {
	this.params = params;
};
PDF24Doc.prototype.addParams = function(params) {
	for (var x in params) {
		this.setParam(x, params[x]);
	}
};
PDF24Doc.prototype.addElement = function(element) {
	if(element instanceof PDF24Element) {
		this.elements.push(element.params);
	} else {
		this.elements.push(element);
	}
};
PDF24Doc.prototype.addFormField = function(form, key, value) {
	var input = document.createElement("input");
	input.type = "hidden";
	input.name = key;
	input.value = String(value);
	form.appendChild(input);
};
PDF24Doc.prototype.create = function() {
	if(this.elements.length <= 0) {
		alert("Envalid length of elements: " + this.elements.length);
	}
	var form = document.createElement("form");
	form.name = "pdf24Form";
	form.method = "post";
	form.target = "pdf24PopWin";
	form.action = "http://doc2pdf.pdf24.org/apijs.php";
	form.style.display = 'none';
	
	if(!this.params.charset) {
		this.params.charset = document.charset;
		if(!this.params.charset) {
			this.params.charset = document.defaultCharset;
		}
	}	
	if(!this.params.referer) {
		this.params.referer = location.href;
	}
	
	this.addFormField(form, "elementCount", this.elements.length);
	for (var x in this.params) {
		this.addFormField(form, x, this.params[x]);
	}
	
	for(var i=0; i<this.elements.length; i++) {
		var ep = this.elements[i];
		for (var x in ep) {
			this.addFormField(form, "e_" + x + i, ep[x]);
		}
	}
	
	document.body.appendChild(form);	
	var popup = window.open('about:blank', 'pdf24PopWin', 'scrollbars=yes,width=400,height=200,top=0,left=0');
	popup.focus();
	form.submit();
	document.body.removeChild(form);
};
PDF24Doc.prototype.setCharset = function(charset) {
	this.setParam('charset', charset);
};
PDF24Doc.prototype.setHeadline = function(headline) {
	this.setParam('headline', headline);
};
PDF24Doc.prototype.setHeadlineUrl = function(headlineUrl) {
	this.setParam('headlineUrl', headlineUrl);
};
PDF24Doc.prototype.setBaseUrl = function(baseUrl) {
	this.setParam('baseUrl', baseUrl);
};
PDF24Doc.prototype.setFilename = function(filename) {
	this.setParam('filename', filename);
};
PDF24Doc.prototype.setPageSize = function(width, height) {
	this.setParam('pageSize', width + 'x' + height);
};
PDF24Doc.prototype.setEmailTo = function(emailAddr) {
	this.setParam('emailTo', emailAddr);
};
PDF24Doc.prototype.addEmailTo = function(emailAddr) {
	if(this.params.emailTo && this.params.emailTo != '') {
		this.params.emailTo += ';' + emailAddr;
	} else {
		this.params.emailTo = emailAddr;
	}
};
PDF24Doc.prototype.setEmailFrom = function(emailAddr) {
	this.setParam('emailFrom', emailAddr);
};
PDF24Doc.prototype.setEmailSubject = function(subject) {
	this.setParam('emailSubject', subject);
};
PDF24Doc.prototype.setEmailBodyType = function(bodyType) {
	this.setParam('emailBodyType', bodyType);
};
PDF24Doc.prototype.setEmailBody = function(body) {
	this.setParam('emailBody', body);
};
PDF24Doc.prototype.setEmailCharset = function(charset) {
	this.setParam('emailCharset', charset);
};

function PDF24Element() {
	this.params = new Object();
}
PDF24Element.prototype.setParam = function(paramKey, paramValue) {
	this.params[paramKey] = paramValue;
};
PDF24Element.prototype.setTitle = function(title) {
	this.setParam('title', title)
};
PDF24Element.prototype.setUrl = function(url) {
	this.setParam('url', url);
};
PDF24Element.prototype.setAuthor = function(author) {
	this.setParam('author', author);
};
PDF24Element.prototype.setDateTime = function(dateTime) {
	this.setParam('dateTime', dateTime);
};
PDF24Element.prototype.setBody = function(body) {
	this.setParam('body', body);
};