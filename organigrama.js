/*
	Libreria para creación de organigramas
	Autor: David Mares
	Dependencias: bootstrap style
	Version: DEV
*/
(function(window, document){
	var organigrama = function(){
	};

	organigrama.prototype.create = function(e) {
		this.tabla = document.createElement('table');

		this.parent = document.getElementById(e);
		this.parent.innerHTML = '';
		this.parent.className = 'organigrama';
		this.parent.appendChild(this.tabla);

		addNode(this.tabla, this.data);

		createControls(this.tabla);
	};

	organigrama.prototype.eventAdd = function(c){
		if(c === undefined){
			alert('Evento Add mal definido');
			return;
		}	
		var btns = this.tabla.querySelectorAll('.nodo .btn-add');

		for(var i = 0; i < btns.length; i++){
			on('click', btns[i], function(){
				c(this.getAttribute('data-id'));
			});
		}
	};

	organigrama.prototype.eventEdit = function(c){
		if(c === undefined){
			alert('Evento Edit mal definido');
			return;
		}	
		var btns = this.tabla.querySelectorAll('.nodo .btn-edit');

		for(var i = 0; i < btns.length; i++){
			on('click', btns[i], function(){
				c(this.getAttribute('data-id'));
			});
		}
	};

	var addNode = function(parent, data) {
		// Elementos para el nodo principal
		var row = document.createElement('tr');
		var cell = document.createElement('td');
		var nodo = document.createElement('div');
		nodo.className = 'nodo';
		nodo.setAttribute('data-id', data.id);
		row.className = 'nodo-header';

		if(data != undefined){
			// contador de hijos
			var childs = data.hijos != undefined ? data.hijos.length * 2 : 0;

			cell.setAttribute('colspan', childs * 2);
			var item = document.createElement('div');
			item.innerText = data.id;
			item.className = 'nodo-id badge';
			nodo.appendChild(item);

			item = document.createElement('div');
			item.innerText = data.puesto;
			item.className = 'nodo-puesto';
			nodo.appendChild(item);

			item = document.createElement('div');
			item.innerText = data.nombre;
			item.className = 'nodo-nombre';
			nodo.appendChild(item);

			cell.appendChild(nodo);
			row.appendChild(cell);
			parent.appendChild(row);

			// ya se agrego el nodo principal, se agregan los hijos
			if(childs != 0){

				var btnExpand = document.createElement('div');
				btnExpand.className = 'btn-collapse glyphicon glyphicon-minus';
				nodo.appendChild(btnExpand);

				on('click', btnExpand, expandCollapse);

				var trs = document.createElement('tr');
				var tds = document.createElement('td');
				var div = document.createElement('div');
				trs.className = 'nodo-child';
				div.className = 'line-down';
				div.innerHTML = '&nbsp;';

				tds.appendChild(div);
				tds.setAttribute('colspan', childs );
				trs.appendChild(tds);
				parent.appendChild(trs);

				trs = document.createElement('tr');
				trs.className = 'nodo-child';
				
				for(var i = 0; i < childs; i++){
					tds = document.createElement('td');
					tds.className = 'line ';
					tds.innerHTML = '&nbsp;';
					if(childs == 2){
						if(i%2==0)
							tds.className += 'right';
						else
							tds.className += 'left';
					}
					if(i != 0 && i != childs - 1){
						if(i%2==0)
							tds.className += 'right up';
						else
							tds.className += 'left up';
					}
					trs.appendChild(tds);
				}

				parent.appendChild(trs);

				trs = document.createElement('tr');
				trs.className = 'nodo-child';
				parent.appendChild(trs);

				for(var i = 0; i < childs/2; i++){
					tds = document.createElement('td');
					tds.setAttribute('colspan', 2);

					trs.appendChild(tds);

					var child = document.createElement('table');

					tds.appendChild(child);

					addNode(child, data.hijos[i]);
				}
			}
		}		
		else{
			nodo.innerText = 'Empty';
			cell.appendChild(nodo);
			row.appendChild(cell);
			parent.appendChild(row);
		}
	};

	var createControls = function(tabla){
		
		var nodos = tabla.querySelectorAll('.nodo');
		for(var i = 0; i < nodos.length; i++){
			var id = nodos[i].getAttribute('data-id');
			var div = document.createElement('div');
			div.className = 'controls';

			// Btn Add
			var btn = document.createElement('btn');
			btn.setAttribute('type','button');
			btn.setAttribute('data-id', id);
			btn.className = 'btn btn-primary btn-block btn-add';

			var icon = document.createElement('i');
			icon.className = 'glyphicon glyphicon-plus';
			btn.appendChild(icon);
			div.appendChild(btn);
			
			// Btn Edit
			btn = document.createElement('btn');
			btn.setAttribute('type','button');
			btn.setAttribute('data-id', id);
			btn.className = 'btn btn-success btn-block btn-edit';

			icon = document.createElement('i');
			icon.className = 'glyphicon glyphicon-pencil';
			btn.appendChild(icon);
			div.appendChild(btn);

			nodos[i].appendChild(div);
		}
	};

	function expandCollapse(){
		var table = undefined;
		if(this.parentNode)
			table = this.parentNode.parentNode.parentNode.parentNode;
		else
			table = this.parent.parent.parent.parent;

		var childs = table.querySelectorAll('.nodo-child');
		for(var i = 0; i < childs.length; i++){
			var classname = childs[i].className;
			childs[i].className = classname.indexOf('hidden') != -1 ?
				classname.replace(' hidden','') :
				classname + ' hidden';
		}
		if(childs.length > 1)
			this.className = this.className.indexOf('minus') != -1 ?
				this.className.replace('minus', 'plus') :
				this.className.replace('plus', 'minus');
	};

	var on = function(e, i, c){
		if(document.addEventListener)
			i.addEventListener(e, c, false);
		else
			i.attachEvent('on' + e, c);
	}

	window.organigrama = new organigrama();
		
})(window, document);