/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.lj.calendar.js 
*/

/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.lj.inlineCalendar.js 
*/

/*!
 * LiveJournal Inline calendar
 *
 * Copyright 2011, dmitry.petrov@sup.com
 *
 * http://docs.jquery.com/UI
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 * @overview Inline calendar widget.
 *
 * Widget can be attached to any existant markup.
 *
 * Date wildcards used:
 *  - %D - day ( 01 - 31 )
 *  - %M - month ( 01 - 02 )
 *  - %Y - year ( yyyy, e.g. 2002 )
 *  - %s - unix timestamp in ms
 *
 * Options:
 *  - dayRef: Format of the url that will be attached to each day in the calendar.
 *  - allRefs: Wether to attach links to days in the calendar.
 *    and override currentDate on success.
 *    Could be: true/false/Object {from: Date, to: Date} (all fields are not required)
 *  - activeFrom: Days before this will be inactive in calendar.
 *  - actoveUntil: Days after this willbe inactive incalendar.
 *  - startMonth: Widget will not allow to switch calendar pane to the month before this.
 *  - endMonth: Widget will not allow to switch calendar pane to the month after this.
 *  - startAtSunday: Wether to count sunday as the start of the week.
 *  - events: Object, containing events to show in the calendar. They will be rendered as links. Structure of the object:
 *    { "yyyy": { "mm1" : [ d1, d2, d3, d4 ], "mm2": [ d5, d6, d7 ] } }
 *
 *  Events:
 *  - daySelected: Event is triggered when user selects a day in the calendar. The second parameter passed to the
 *  function is a Date object.
 *  - dateChange Event is triggered when user click on next or prev month/year button.
 *  - currentDateChange: Events is triggered when a new date is set in calendar as current.
 *
 *  Consistent options ( setting these options is guaranteed to work correctly ):
 *  - currentDate, date - Set/get current date.
 *  - activeFrom, date - Set/get earliest active date.
 *  - activeUntil, date - Set/get last active date.
 *  - title, title - set calendar title.
 *  - events, obj - override current events object
 *
 *  @TODO: move all service functions to the widget object and merge it with the view.
 *
 */

(function( $, window ) {

	var defaultOptions = {
		dayRef: '/%Y/%M/%D',
		monthRef: '', //the same, but for the months and year. Calendar will render link, if options are set
		yearRef: '',
		allRefs: false,
		currentDate: new Date(),
		//allow user to select dates in this range
		activeUntil: null,
		activeFrom: null,
		//allow user to switch months between these dates
		startMonth: new Date( 1900, 0, 1 ),
		endMonth: new Date( 2050, 0, 1 ),
		startAtSunday: !(LiveJournal.getLocalizedStr('date.format.offset') !== '0') || false,
		dateFormat: "%Y-%M-%D",
		defaultTitle: "Calendar",
		longMonth: false,

		events: null, //object with events to show in the calendar
		displayedMonth: null, //month displayed on the calendar. If not specified at
								//startup currentDate is used instead.
		dateChange: null,

		selectors: {
			table: 'table',
			title: 'h5',
			tbody: 'tbody',

			month: '.cal-nav-month',
			year:  '.cal-nav-year',
			monthSelect: '.cal-nav-month-select',
			yearSelect:  '.cal-nav-year-select',

			prevMonth: '.cal-nav-month .cal-nav-prev',
			nextMonth: '.cal-nav-month .cal-nav-next',
			prevYear:  '.cal-nav-year .cal-nav-prev',
			nextYear:  '.cal-nav-year .cal-nav-next',

			monthLabel: '.cal-nav-month .cal-month',
			yearLabel: '.cal-nav-year .cal-year'
		},

		classNames: {
			container: '',
			inactive : 'other',
			future : 'other',
			current  : 'current',
			weekend: 'weekend',
			nextDisabled : 'cal-nav-next-dis',
			prevDisabled : 'cal-nav-prev-dis',
			cellHover : 'hover',
			longMonth: 'sidebar-cal-longmonth'
		},

		//now, all lang variables are collected from Site.ml_text and should not be modified
		mlPrefix: {
			monthNamesShort: ['monthNames', 'date.month.{name}.short'],
			monthNamesLong: ['monthNames', 'date.month.{name}.long'],
			dayNamesShort: ['dayNames', 'date.day.{name}.short']
		},

		ml: {
			monthNames: [ "january", "february", "march", "april", "may", "june", "july",
							 "august", "september", "october", "november", "december"],
			dayNames: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
			caption: "Calendar"
		}
	};

	function getDateNumber( d, dropDays ) {
		dropDays = dropDays || false;
		var day = d.getDate().toString();
		if( day.length === 1 ) { day = "0" + day; }
		if( dropDays ) {
			day = "";
		}

		var month = d.getMonth().toString();
		if( month.length === 1 ) { month = "0" + month; }

		return parseInt( d.getFullYear().toString() + month + day, 10);
	}

	function insideTimeRange( range, iDate ) {
		return getDateNumber( iDate, true ) >= getDateNumber( range[0], true ) &&
				getDateNumber( iDate, true ) <= getDateNumber( range[1], true );
	}

	function View(nodes, styles, o)
	{
		this.initialize = function (date) {
			this.tbody = this.catchTableStructure(date);
		};

		this.modelChanged = function (monthDate, events, switcherStates)
		{
			var monthml = o.longMonth? o.ml.monthNamesLong : o.ml.monthNamesShort;
			//we have a 30% speedup when we temporary remove tbody from dom
			this.tbody.detach();
			this.fillDates(monthDate, events);

			for (var sws in switcherStates) {
				nodes[sws][ (!switcherStates[sws]) ? 'addClass' : 'removeClass']( this.disabledStyle(sws) );
			}

			var monthText = o.monthRef
					? $( '<a>', { href: LJ.Util.Date.format( monthDate, o.monthRef ), text: monthml[ monthDate.getMonth() ] } )
					: monthml[ monthDate.getMonth() ];

			var yearText = o.yearRef
					? $( '<a>', { href: LJ.Util.Date.format( monthDate, o.yearRef ), text: monthDate.getFullYear() } )
					: monthDate.getFullYear();

			nodes.monthLabel.empty().append( monthText );
			nodes.yearLabel.empty().append( yearText );

			this.tbody.appendTo( nodes.table );
		};

		this.catchTableStructure = function(date) {
			var tbody = nodes.tbody[0];
			nodes.daysCells = [];
			nodes.daysSpans = [];

			var row, rowsCount = tbody.rows.length, cell, cellsCount;

			var toAdd = 6 - rowsCount;

			var rowStr = '<tr>';
			for( var i = 0; i < 7; ++i ) { rowStr += '<td><span></span></td>'; }
			rowStr += '</tr>';

			while( toAdd-- > 0 ) {
				//add missing rows if server has rendered not enough markup
				$( rowStr ).hide().appendTo( nodes.tbody );
			}
			rowsCount = 6;
			nodes.lastRow = jQuery( tbody.rows[ tbody.rows.length - 1 ] );
			date = new Date(date);

			for( row = 0; row < rowsCount; ++row ) {
				for( cell = 0, cellsCount = tbody.rows[ row ].cells.length; cell < cellsCount; ++cell ) {
					// take into account span inside td
					var node = jQuery( tbody.rows[ row ].cells[ cell ] ),
						children = node.children(),
						day = children.text().trim();

					if(day) {
						date.setDate(day);
						node.data('isActive', true);
						node.data('day', date);
					}

					nodes.daysCells.push(node);
					nodes.daysSpans.push(children);
				}
			}

			return jQuery( tbody );
		};

		this.fillDates = function (monthDate, events)
		{
			function hasEvents( date ) {
				var year = date.getFullYear(),
					month = date.getMonth(),
					day = date.getDate();

				return( events && events[ year ] && events[ year ][ month ] && events[ year ][ month ][ day ] );
			}

			var d = new Date( monthDate );
			d.setDate( 1 );

			var offset;
			if( o.startAtSunday ) {
				offset = d.getDay();
			} else {
				offset = ( d.getDay() === 0 ? 6 : d.getDay()  - 1 );
			}
			d.setDate( 1 - offset );

			for( var i = 0, l = nodes.daysCells.length; i < l; ++i ) {
				var cell = nodes.daysCells[ i ],
					span = nodes.daysSpans[ i ];

				this.formDayString( d, cell, span, hasEvents( d ), this.isActiveDate( d, monthDate ) );

				d.setDate( d.getDate() + 1 );
			}

			d.setDate( d.getDate() - 1 ); //get the date from the last cell
			//we do not use show and hide methods, because show method sets display: block;
			if( d.getDate() < 7 ) {
				nodes.lastRow.css('display', '');
			} else {
				nodes.lastRow.css('display', 'none');
			}
		};

		this.isActiveDate = function( date, currentMonth ) {
			var isActive = true;

			isActive = ( currentMonth.getFullYear() === date.getFullYear() && currentMonth.getMonth() === date.getMonth() );

			if( isActive && ( o.activeFrom || o.activeUntil ) ) {
				isActive = ( o.activeFrom && getDateNumber( o.activeFrom ) <= getDateNumber( date ) ) ||
					( o.activeUntil && getDateNumber( o.activeUntil ) >= getDateNumber( date ) );
			}

			return isActive;
		};

		this.formDayString = function( d, cell, span, hasEvents, isActive )
		{
			d = new Date( d );
			var oldDay = cell.data( 'day' ),
				oldHasEvents = cell.data( 'hasEvents' ),
				oldIsActive = cell.data( 'isActive' );

			var isCurrentDay = ( getDateNumber( d ) === getDateNumber( o.currentDate ) );

			cell.data( 'day', d );
			cell.data( 'isActive', isActive );
			cell.data( 'hasEvents', hasEvents );

			cell[isCurrentDay ? 'addClass' : 'removeClass']( styles.current );
			cell.removeClass( styles.cellHover );

			if( !isActive ) {
				cell.addClass( styles.inactive );
				span.html(d.getDate());
			} else if( hasEvents || o.allRefs ) {

				var _tmpAllRefs = true;
				if (o.allRefs && typeof o.allRefs === 'object') {
					if (o.allRefs.from && d < o.allRefs.from) {
						_tmpAllRefs = false;
					}

					if (o.allRefs.to && d > o.allRefs.to) {
						_tmpAllRefs = false;
					}
				}

				if (_tmpAllRefs) {
					cell.removeClass( styles.inactive );
					span.html( $( '<a />', {
						html: d.getDate(),
						href: LJ.Util.Date.format( d, o.dayRef )
					}));
				} else {
					cell.removeClass(styles.inactive);
					span.html(d.getDate());
				}

			} else {
				cell.removeClass( styles.inactive );
				span.html(d.getDate());
			}
		};

		this.disabledStyle = function (sws)
		{
			if(sws === 'prevMonth' || sws === 'prevYear') {
				return styles.prevDisabled;
			} else {
				return styles.nextDisabled;
			}
		};
	}

	var Calendar = {
		options: {}, //all options were move to the default options object

		_create: function() {
			this._preInit();
			this._initialize();
			this._postInit();
		},

		_preInit: function() {
			var def = $[ this.namespace ][ this.widgetName ].getDefaults();
			this.options = jQuery.extend( true, {}, def, this.options );
			this._prepareMLVars();
		},

		_prepareMLVars: function() {
			var self = this,
				expandVar = function(prefix, name) {
					return LiveJournal.getLocalizedStr(prefix.supplant({name: name}));
				},
				prefixData;

			for (var prefix in this.options.mlPrefix) {
				if (this.options.mlPrefix.hasOwnProperty(prefix)) {
					prefixData = this.options.mlPrefix[prefix];
					this.options.ml[prefix] = this.options.ml[prefixData[0]].map(expandVar.bind(null, prefixData[1]));
				}
			}
		},

		// @TODO: need to change the structure of initialization code to remove this method
		_initialize: function() {
			if( !this.options.displayedMonth ) {
				this.options.displayedMonth = new Date( this.options.currentDate );
			}

			this._events = this.options.events;
			this._hideTimer = null;
			this._nodes = this._nodes || { container: this.element, root: this.element };
			this._invalidateTimer = null;
			
			if (this.element.hasClass(this.options.classNames.longMonth)) {
				this.options.longMonth = true;
			}

			this._bindNodes();

			this.options.startMonth.setDate( 1 );

			this._view = new (this._getView())( this._nodes, this.options.classNames, this.options );
			this._view.initialize(this.options.currentDate);

			if( this._nodes.table.hasClass( "monday" ) ) {
				this._setOption( "startAtSunday", false );
			}

			this._nodes.monthSelect.val(this.options.displayedMonth.getMonth());
			this._nodes.yearSelect.val(this.options.displayedMonth.getFullYear());

			this._bindEvents();
		},

		_postInit: function() {
		},

		_getView: function() {
			return View;
		},

		_bindNodes: function() {
			for( var i in this.options.selectors ) {
				if( !( i in this._nodes ) ) {
					this._nodes[ i ] = this._nodes.container.find( this.options.selectors[ i ] );
				}
			}

			var displayedMonth = LJ.Util.Date.parse(this._nodes.table.attr( "data-date"), this.options.dateFormat)
			if(displayedMonth) {
				this.options.displayedMonth = displayedMonth;
			}
		},

		destroy: function() {
			$.Widget.prototype.destroy.apply(this, arguments);
		},

		_bindEvents: function() {
			var self = this;

			var switcherStates = this._getSwitcherStates( this.options.currentDate ),
				switcherMouseDown = function( item ) {
					return function (ev) {
						ev.preventDefault();
						ev.stopPropagation();
						var switcherStates = self._getSwitcherStates( self.options.currentDate );

						if( switcherStates[item] ) {
							self["_" + item]();
						}
					};
				};

			for (var sws in switcherStates) {
				this._nodes[sws].click( switcherMouseDown(sws) );
			}

			this._nodes.monthSelect.change(function(ev) {
				var d = new Date(self.options.currentDate);
				d.setMonth(this.value);
				self._setOption('currentDate', d);
			});

			this._nodes.yearSelect.change(function(ev) {
				var d = new Date(self.options.currentDate);
				d.setFullYear(this.value);
				self._setOption('currentDate', d);
			});

			this._nodes.tbody
				.delegate( 'td', 'click', function( ev ) {
					self._cellSelectedEvent( $( this ), ev );
				} );
		},

		_switchMonth: function ( go ) {
			var event = jQuery.Event( "dateChange" );
			event.moveForward = go > 0;
			event.switchType = Math.abs( go ) === 12 ? "year" : ( Math.abs( go ) === 1 ? "month" : null );

			event.date = new Date(this.options.displayedMonth.getFullYear(), this.options.displayedMonth.getMonth() + go, 1);

			this._nodes.root.trigger( event );
			this._setOption( 'displayedMonth', event.date );
		},

		_prevMonth: function () { this._switchMonth( -1 ); },
		_nextMonth: function () { this._switchMonth( 1 ); },

		_prevYear : function () { this._switchMonth( -12 ); },
		_nextYear : function () { this._switchMonth( 12 ); },

		_cellSelectedEvent: function( cell, ev ) {
			//if cell is inactive or user controls it's behavior we do not pass event to the link
			if( !cell.data('isActive' ) || this._cellSelected( cell.data( 'day' ) ) ) {
				ev.stopPropagation();
				ev.preventDefault();
			}
		},

		/**
		 * @return {Boolean} returns true if user prevents default behaviour
		 */
		_cellSelected: function( date ) {
			var event = jQuery.Event( "daySelected" );
			this._nodes.root.trigger( event, [ date, LJ.Util.Date.format(date, this.options.dateFormat) ] );

			if( !event.isDefaultPrevented() ) {
				this._setOption( 'currentDate', date );
			}

			return !event.isDefaultPrevented();
		},

		_fitDate: function( date ) {
			date = new Date( date );
			var enabledMonthsRange = [ this.options.startMonth, this.options.endMonth ];

			if( !insideTimeRange( enabledMonthsRange, date ) ) {
				if( getDateNumber( date, true ) < getDateNumber( enabledMonthsRange[ 0 ], true ) ) {
					date = new Date( enabledMonthsRange[ 0 ] );
				} else {
					date = new Date( enabledMonthsRange[ 1 ] );
				}
			}

			return date;
		},

		_getSwitcherStates: function () {
			var monthDate = this.options.displayedMonth,
				yearStart = new Date( monthDate.getFullYear(), 0, 1 ),
				yearEnd = new Date( monthDate.getFullYear(), 11, 1 );

			return {
				prevMonth: this._isActivePrev( monthDate ) !== false,
				prevYear: this._isActivePrev( yearStart ) !== false,
				nextMonth: this._isActiveNext( monthDate ) !== false,
				nextYear: this._isActiveNext( yearEnd ) !== false
			};
		},

		_isActiveNext: function( date ) { return this._isActiveDate( date, 1 ); },
		_isActivePrev: function( date ) { return this._isActiveDate( date, -1 ); },
		_isActiveDate: function( date, dir ) {
			var d = new Date( date );
			d.setMonth( d.getMonth() + dir );
			d.setDate( 1 );

			return insideTimeRange( [ this.options.startMonth, this.options.endMonth ], d );
		},

		_invalidateDisplay: function() {
			var self = this;
			clearTimeout( this._invalidateTimer );

			setTimeout( function() {
				self._view.modelChanged( self.options.displayedMonth, self._events, self._getSwitcherStates() );
			}, 50 );
		},

		_setOption: function( name, value ) {
			switch( name ) {
				case 'currentDate':
					this.options.currentDate = this._fitDate( value );

					var event = jQuery.Event("currentDateChange"),
						date = new Date(this.options.currentDate);
					this._nodes.root.trigger( event, [ date, LJ.Util.Date.format(date, this.options.dateFormat) ] );

					this._setOption( 'displayedMonth', value );
					this._invalidateDisplay();
					break;
				case 'activeFrom':
					this.options.activeFrom = new Date( value );
					this._invalidateDisplay();
					break;
				case 'activeUntil':
					this.options.activeUntil = new Date( value );
					this._invalidateDisplay();
					break;
				case 'title':
					this._title = value;
					this._nodes.title.html( value );
					break;
				case 'events':
					this._events = value;
					this._invalidateDisplay();
					break;
				case 'displayedMonth':
					var newDate = this._fitDate( new Date( value ) ),
						isCurrentMonth = getDateNumber(newDate, true) === getDateNumber(this.options.displayedMonth, true);

					if( !isCurrentMonth ) {
						this.options.displayedMonth = this._fitDate( new Date( value ) );
						this._nodes.monthSelect.val(this.options.displayedMonth.getMonth());
						this._nodes.yearSelect.val(this.options.displayedMonth.getFullYear());
						this._invalidateDisplay();
					}

					break;
				case 'startMonth':
					this.options.startMonth = new Date( value );
					this._invalidateDisplay();
					break;
				case 'endMonth':
					this.options.endMonth = new Date( value );
					this._invalidateDisplay();
					break;
				case 'startAtSunday':
					this.options.startAtSunday = !!value;
					break;
			}
		},

		getElement: function( name ) {
			if( name in this._nodes ) {
				return this._nodes[ name ];
			} else {
				return null;
			}
		}

	};

	$.widget('lj.inlineCalendar', Calendar );

	jQuery.extend( $.lj.inlineCalendar, {

		getDefaults: function() {
			return defaultOptions;
		},

		setDefaults: function ( opts ) {
			if( opts ) {
				jQuery.extend( true, defaultOptions, opts );
			}
		}
	} );

} ( jQuery, window ) );

;

/* file-end: js/jquery/jquery.lj.inlineCalendar.js 
----------------------------------------------------------------------------------*/

/*!
 * LiveJournal Calendar
 *
 * Copyright 2011, dmitry.petrov@sup.com
 *
 * http://docs.jquery.com/UI
 * 
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.lj.bubble.js
 *	jquery.lj.inlineCalendar.js
 *
 *  input plugin ( jquery_fn.js )
 *  mask plugin  ( jquery/jquery.mask.js )
 *
 * @overview Calendar widget.
 *
 * Widget can be attached either directly to input or to any other element.
 * If selected element is not input then input element can be set through options.input variable.
 *
 * Date wildcards used:
 *  - %D - day ( 01 - 31 )
 *  - %M - month ( 01 - 02 )
 *  - %Y - year ( yyyy, e.g. 2002 )
 *  - %s - unix timestamp in ms
 *
 * Options:
 *  - dayRef: Format of the url that will be attached to each day in the calendar.
 *  - allRefs: Wether to attach links to days in the calendar.
 *  - currentDate:  initialy selected date. If input is not empty, than widget will try to parse it's contents
 *  and override currentDate on success.
 *  - activeFrom: Days before this will be inactive in calendar.
 *  - actoveUntil: Days after this willbe inactive incalendar.
 *  - startMonth: Widget will not allow to switch calendar pane to the month before this.
 *  - endMonth: Widget will not allow to switch calendar pane to the month after this.
 *  - startAtSunday: Wether to count sunday as the start of the week.
 *  - dateFormat: Format of date string that will be inserted in the input after user selected value.
 *  - showOn: When to display calendat widget ( click, hover, focus )
 *  - hoverDelay: When showOn === 'hover', this option represents the delay in ms after which calendar will be hidden.
 *  - events: Object, containing events to show in the calendar. They will be rendered as links. Structure of the object:
 *    { "yyyy": { "mm1" : [ d1, d2, d3, d4 ], "mm2": [ d5, d6, d7 ] } }
 *
 *  Events:
 *  - daySelected: Event is triggered when user selects a day in the calendar. The second parameter passed to the
 *  function is a Date object.
 *  - dateChange
 *
 *  Consistent options ( setting these options is guaranteed to work correctly ):
 *  - currentDate, date - Set/get current date. Input is also updated on set.
 *  - activeFrom, date - Set/get earliest active date.
 *  - activeUntil, date - Set/get last active date.
 *  - title, title - set calendar title.
 *  - events, obj - override current events object
 *
 *
 */

(function( $, window ) {

	var tmpl;

	var defaultOptions = {
		showOn: 'click',
		closeControl: true,
		showCellHovers: false,

		hoverDelay: 400,
		align: 'center',
		events: null, //object with events to show in the calendar
		displayedMonth: null, //month displayed on the calendar. If not specified at
								//startup currentDate is used instead.
		bubbleClass: false, //whether to add class to the bubble markup

		selectors: {
			tmpl: '.appwidget-calendar .calendar'
		},

		classNames: {
			showCellHovers: 'all-days',
			popup: 'b-bubble-calendar'
		},

		templates: {
			calendar: '<div class="popup-inner calendar" style="display: none;"> \
						<h5>${caption}</h5> \
						<p class="cal-nav"> \
							<span class="cal-nav-month"> \
								<i class="cal-nav-prev"></i> \
								<span class="cal-month"></span> \
								<i class="cal-nav-next cal-nav-next-dis"></i> \
							</span> \
							<span class="cal-nav-year"> \
								<i class="cal-nav-prev cal-nav-prev"></i> \
								<span class="cal-year"></span> \
								<i class="cal-nav-next cal-nav-next-dis"></i> \
							</span> \
						</p> \
						<table cellspacing="0" cellpadding="0"> \
							<thead> \
								<tr> \
									{{each days}} \
										<th class="{{if $index % 7 === weekend1 || $index % 7 === weekend2}} weekend{{/if}}{{if $index === 0}} first{{/if}}{{if $index === days.length - 1}} last{{/if}}">${day}</th> \
									{{/each}} \
								</tr> \
							</thead> \
							<tbody> \
								{{each cells}} \
								{{if $index % 7 === 0}}<tr>{{/if}} \
								<td{{if $index % 7 === weekend1 || $index % 7 === weekend2}} class="weekend"{{/if}}><span></span></td> \
								{{if $index % 7 === 6}}</tr>{{/if}} \
								{{/each}} \
							</tbody> \
						</table></div>'
		}
	};

	var Calendar = {
		options: {}, //all options were move to the default options object

		_initialize: function() {
			if( !tmpl ) {
				tmpl = this._buildDOM();
			}

			this._nodes = { container: tmpl.clone(), root: this.element };

			$.lj.inlineCalendar.prototype._initialize.apply( this );
			this._invalidateDisplay();
		},

		_bindNodes: function() {
			$.lj.inlineCalendar.prototype._bindNodes.apply( this );

			var self = this;

			this._nodes.container
				.bubble( {
					classNames: {
						containerAddClass: this.options.bubbleClass ? this.options.classNames.popup : ''
					},
					target: this._nodes.root,
					align: this.options.align,
					closeControl: this.options.closeControl,
					showOn: this.options.showOn,
					closeOnContentClick: false
				} )
				.bind( 'bubbleshow', function( ev ) {
					self._trigger( 'show' );
				} )
				.bind( 'bubblehide', function( ev ) {
					self._trigger( 'hide' );
				} )
				.addClass( this.options.classNames.container );

			if( this.options.input ) {
				this._nodes.input = this.options.input;
			} else {
				if( this._nodes.root.is( '[type=text]' ) ) {
					this._nodes.input = this._nodes.root;
				} else {
					this._nodes.input = $();
				}
			}

			if (this._nodes.input.mask) {
				this._nodes.input
					.mask( "?dddd-dd-dd", { placeholder: " " } );
			}

			this._nodes.input.input(this._parseInputValue.bind(this));

			var currentDate = LJ.Util.Date.parse(this._nodes.input.val(), this.options.dateFormat)
			if( currentDate ) {
				this.options.currentDate = currentDate;
			}

			if( this.options.showCellHovers ) {
				this._nodes.table.addClass( this.options.classNames.showCellHovers );
			}
		},

		destroy: function() {
			this._nodes.container.bubble( 'destroy' );
			$.lj.inlineCalendar.prototype.destroy.apply( this );
		},

		_buildDOM: function() {
			var days = this.options.ml.dayNamesShort.map(function(el) { return { day: el }; }),
				weekendIdx1 = 0,
				weekendIdx2 = 6,
				makeArray = function(size, val) {
					var res = [];
					while(size--) { res.push(val); }

					return res;
				};

			if (!this.options.startAtSunday) {
				days[7] = days[0];
				days.shift();
				weekendIdx1 = 5;
			}

			var years = [],
				months = [];

			//generating years
			var endYear = this.options.endMonth.getFullYear(),
				startYear = this.options.startMonth.getFullYear();

			while (endYear >= startYear) {
				years.push({ year: endYear--});
			}

			months = this.options.ml.monthNamesLong.map(function(el) { return {month: el}; });

			var tmplOptions = {
				caption: this.options.ml.caption,
				days: days,
				months: months,
				years: years,
							//   vvvvv - rows * days in week
				cells: makeArray(6 * 7, {}),
				weekend1: weekendIdx1,
				weekend2: weekendIdx2
			};

			if (this.options.templates.calendar.indexOf(' ') !== -1) {
				return jQuery.tmpl(this.options.templates.calendar, tmplOptions);
			} else {
				return LJ.UI.template(this.options.templates.calendar, tmplOptions);
			}
		},

		_parseInputValue: function() {
			var newDate = LJ.Util.Date.parse(this._nodes.input.val(), this.options.dateFormat)

			if( newDate ) {
				this._cellSelected( newDate );
			}
		},

		_cellSelectedEvent: function( cell, ev ) {
			var self = this;

			$.lj.inlineCalendar.prototype._cellSelectedEvent.call( this, cell, ev );

			// if all of table cells are active controls (so on click on the cell we change date or something) - hide calendar
			if (self.options.showCellHovers && !!cell.data('isActive') ) {
				self._nodes.container.bubble( 'hide' );
			}

			// if target of click is link - redirect to its url
			if (ev.target.tagName.toLowerCase() == 'a') {
				window.location.href = ev.target.href;
			}
		},

		_invalidateDisplay: function() {
			this._view.modelChanged( this.options.displayedMonth, this._events, this._getSwitcherStates() );
		},

		_setOption: function( name, value ) {
			$.lj.inlineCalendar.prototype._setOption.call( this, name, value );

			switch( name ) {
				case 'currentDate':
					this._nodes.input
						.val(LJ.Util.Date.format(this.options.currentDate, this.options.dateFormat));
					break;
				default:
			}
		}
	};

	$.widget( 'lj.calendar', $.lj.inlineCalendar, Calendar );
	jQuery.extend( $.lj.calendar, {
		getDefaults: function() {
			return jQuery.extend( true, {}, $.lj.inlineCalendar.getDefaults(), defaultOptions );
		},

		setDefaults: function ( opts ) {
			if( opts ) {
				jQuery.extend( defaultOptions, opts );
			}
		}
	} );

} ( jQuery, window ) );
;

/* file-end: js/jquery/jquery.lj.calendar.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.mask.js 
*/

/**
 * @requires  $.caret
 */

(function($) {
	var input = ($.browser.msie ? "paste": "input") + ".mask";
	var iPhone = (window.orientation != undefined);

	$.mask = {
		definitions: {
			"d": "[0-9]",
			"w": "[A-Za-z]",
			"*": "[A-Za-z0-9а-яА-Я]"
		}
	};
	$.fn.extend({
		unmask: function() {
			return this.trigger("unmask");
		},
		mask: function(maskStr, options) {
			if (!maskStr && this.length > 0) {
				var node = $(this[0]);
				var inputCharTests = node.data( "tests" );

				//if mask is not defined, we return current state of buffer
				return $.map( node.data( "buffer" ), function( el , idx ) {
					return inputCharTests[ idx ] ? el : null;
				}).join("");
			}
			options = $.extend({
				placeholder: "_",
				completed: null
			},
			options);
			var maskDefs = $.mask.definitions;
			var inputCharTests = [];
			//if entered text is longer than question mark position, we do not erase it
			var eraseBorderPos = maskStr.length;
			var lastTestIdx = null;
			var maskLen = maskStr.length;

			//here we generate regexp array to test every char of input
			$.each(maskStr.split(""), function(idx, chr) {
				if (chr == "?") {
					maskLen--;
					eraseBorderPos = idx;
				} else {
					if (maskDefs[chr]) {
						inputCharTests.push(new RegExp(maskDefs[chr]));
						if (lastTestIdx == null) {
							lastTestIdx = inputCharTests.length - 1
						}
					} else {
						inputCharTests.push(null)
					}
				}
			});
			return this.each(function() {
				var $input = $(this);

				//bufferArr is an array containing all the chars of input
				var bufferArr = $.map(maskStr.split(""), function(chr, idx) {
					if (chr != "?") {
						return maskDefs[chr] ? options.placeholder: chr;
					}
				});
				var isSpecialChar = false;
				var inputVal = $input.val();
				$input.data("buffer", bufferArr).data("tests", inputCharTests);

				function getNextTestIdx(offsetIdx) {
					while (++offsetIdx <= maskLen && ! inputCharTests[offsetIdx]) {}
					return offsetIdx
				}

				// this function removes char at specified index from buffer and shift
				// all its' contents left while filtering through the mask
				function removeCharFromBuffer(charIdx) {
					while (!inputCharTests[charIdx] && --charIdx >= 0) {}
					for (var idx = charIdx; idx < maskLen; idx++) {
						if (inputCharTests[idx]) {
							bufferArr[idx] = options.placeholder;
							var nextMaskedChrIdx = getNextTestIdx(idx);
							//if next masked char fits into the mask of the current, we shift it left
							//otherwise stop
							if (nextMaskedChrIdx < maskLen && inputCharTests[idx].test(bufferArr[nextMaskedChrIdx])) {
								bufferArr[idx] = bufferArr[nextMaskedChrIdx]
							} else {
								break;
							}
						}
					}
					updateInputVal();
					$input.caret(Math.max(lastTestIdx, charIdx))
				}

				//insert placeholder at selected position and shift chars, that were after it.
				function insertPlaceholder( start ) {
					for (var idx = start, insertChar = options.placeholder; idx < maskLen; idx++) {
						if (inputCharTests[idx]) {
							var testIdx = getNextTestIdx(idx);
							var bufChr = bufferArr[idx];
							bufferArr[idx] = insertChar;
							if (testIdx < maskLen && inputCharTests[testIdx].test(bufChr)) {
								insertChar = bufChr;
							} else {
								break;
							}
						}
					}
				}

				function keyDownHandler(ev) {
					var caretPos = $(this).caret();
					var keyCode = ev.keyCode;
					isSpecialChar = (keyCode < 16 || (keyCode > 16 && keyCode < 32) || (keyCode > 32 && keyCode < 41));
					if ((caretPos.start - caretPos.end) != 0 && (!isSpecialChar || keyCode == 8 || keyCode == 46)) {
						resetBuffer(caretPos.start, caretPos.end);
					}
					if (keyCode == 8 || keyCode == 46 || (iPhone && keyCode == 127)) {
						removeCharFromBuffer(caretPos.start + (keyCode == 46 ? 0: - 1));
						return false;
					} else {
						if (keyCode == 27) {
							$input.val(inputVal);
							$input.caret(0, parseInputValue());
							return false;
						}
					}
				}
				function keyPressHandler(ev) {
					if (isSpecialChar) {
						isSpecialChar = false;
						return (ev.keyCode == 8) ? false: null
					}
					ev = ev || window.event;
					var charCode = ev.charCode || ev.keyCode || ev.which;
					var caretPos = $(this).caret();
					if (ev.ctrlKey || ev.altKey || ev.metaKey) {
						return true;
					} else {
						if ( (charCode >= 32 && charCode <= 125) || charCode > 186 ) {
							var testIdx = getNextTestIdx( caretPos.start - 1 );
							if ( testIdx < maskLen ) {
								var chr = String.fromCharCode(charCode);
								if ( inputCharTests[ testIdx ].test( chr ) ) {
									insertPlaceholder( testIdx );
									bufferArr[ testIdx ] = chr;
									updateInputVal();
									var caretPos = getNextTestIdx( testIdx );
									$( this ).caret( caretPos );
									if( options.completed && caretPos == maskLen ) {
										options.completed.call( $input )
									}
								}
							}
						}
					}
					return false
				}
				//reset masked chars in range with default placeholer
				function resetBuffer(start, end) {
					for (var idx = start; idx < end && idx < maskLen; idx++) {
						if (inputCharTests[idx]) {
							bufferArr[idx] = options.placeholder
						}
					}
				}
				//updates input according latest buffer contents and returns this string
				function updateInputVal() {
					return $input.val(bufferArr.join("")).val()
				}

				/**
				 * @param boolean takeFullInputValue If true, function will not cut off input value
				 *    if it's length is bellow question mark position or greater than the number of characters
				 *    that where input.
				 */
				function parseInputValue( takeFullInputValue ) {
					var inputValue = $input.val();
					var lastEnteredBufIdx = - 1;

					for (var bufIdx = 0, inputChrIdx = 0; bufIdx < maskLen; bufIdx++) {
						if (inputCharTests[bufIdx]) {
							bufferArr[bufIdx] = options.placeholder;
							while (inputChrIdx++ < inputValue.length) {
								var chr = inputValue.charAt(inputChrIdx - 1);
								if (inputCharTests[bufIdx].test(chr)) {
									bufferArr[bufIdx] = chr;
									lastEnteredBufIdx = bufIdx;
									break;
								}
							}
							if (inputChrIdx > inputValue.length) {
								break;
							}
						} else {
							if (bufferArr[bufIdx] == inputValue.charAt(inputChrIdx) && bufIdx != eraseBorderPos) {
								inputChrIdx++;
								lastEnteredBufIdx = bufIdx;
							}
						}
					}

					//if user entered value before the question mark, we clear buffer contents
					if (!takeFullInputValue && lastEnteredBufIdx + 1 < eraseBorderPos) {
						$input.val("");
						resetBuffer(0, maskLen);
					} else {
						if ( takeFullInputValue  || lastEnteredBufIdx + 1 >= eraseBorderPos) {
							updateInputVal();
							if ( !takeFullInputValue ) {
								$input.val($input.val().substring(0, lastEnteredBufIdx + 1))
							}
						}
					}
					return (eraseBorderPos ? bufIdx : lastTestIdx);
				}

				if (!$input.attr("readonly")) {
					$input.one("unmask", function() {
						$input.unbind(".mask").removeData("buffer").removeData("tests")
					}).bind("focus.mask", function() {
						inputVal = $input.val();
						var lastEnteredValIndex = parseInputValue();
						updateInputVal();
						setTimeout(function() {
							if ( lastEnteredValIndex == maskStr.length ) {
								$input.caret( 0, lastEnteredValIndex )
							} else {
								$input.caret( lastEnteredValIndex )
							}
						},
						0)
					}).bind("blur.mask", function() {
						parseInputValue();
						if ($input.val() != inputVal) {
							$input.change();
						}
					}).bind("keydown.mask", keyDownHandler).bind("keypress.mask", keyPressHandler).bind( input , function() {
						setTimeout(function() {
							$input.caret(parseInputValue(true))
						},
						0);
					})
				}
				parseInputValue();
			})
		}
	})
})(jQuery);
;

/* file-end: js/jquery/jquery.mask.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.lj.share.js 
*/

/* ---------------------------------------------------------------------------------
   file-start: js/core/object.js 
*/

;(function() {
    'use strict';

    LJ.define('LJ.Object');
    
    /**
     * Return a copy of the object only containing the whitelisted properties.
     * @param {Object} obj Object source
     * @param {String} keys* Keys which should be picked from source object
     * @return {Object} Copy of source object that contains only whitelisted keys
     */
    LJ.Object.pick = function(obj) {
        var copy = {},
            keys = Array.prototype.concat.apply(
                [], Array.prototype.slice.call(arguments, 1)
            );

        keys.forEach(function (key) {
            if (key in obj) {
                copy[key] = obj[key];
            }
        });

        return copy;
    };

})();;

/* file-end: js/core/object.js 
----------------------------------------------------------------------------------*/

/**
 * @author Valeriy Vasin (valeriy.vasin@sup.com)
 * @fileOverview Plugin is responsible for sharing functionality
 * @requires jquery.lj.bubble.js
 */
;(function ($) {
    'use strict';

    /**
     * @todo Remove service defaults from JavaScript. It should come from server
     */

    // services defaults that will be used if server doesn't provide `services` option
    var SERVICES = {
        livejournal: {
            title: 'LiveJournal',
            bindLink: 'http://livejournal.com/update.bml?repost_type=c&repost={url}',
            openInTab: true
        },
        facebook: {
            title: 'Facebook',
            bindLink: 'http://www.facebook.com/sharer.php?u={url}'
        },
        twitter: {
            title: 'Twitter',
            bindLink: 'http://twitter.com/share?url={url}&text={title}&hashtags={hashtags}'
        },
        vkontakte: {
            title: 'Vkontakte',
            bindLink: 'http://vkontakte.ru/share.php?url={url}'
        },
        moimir: {
            title: 'Moi Mir',
            bindLink: 'http://connect.mail.ru/share?url={url}'
        },
        stumbleupon: {
            title: 'Stumbleupon',
            bindLink: 'http://www.stumbleupon.com/submit?url={url}',
            openInTab: true
        },
        digg: {
            title: 'Digg',
            bindLink: 'http://digg.com/submit?url={url}',
            openInTab: true
        },
        email: {
            title: 'E-mail',
            bindLink: 'http://api.addthis.com/oexchange/0.8/forward/email/offer?username=internal&url={url}&title={title}',
            height: 600
        },
        tumblr: {
            title: 'Tumblr',
            bindLink: 'http://www.tumblr.com/share?v=3&u={url}&description={text}'
        },
        odnoklassniki: {
            title: 'Odnoklassniki',
            bindLink: 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl={url}'
        }
    };

    $.widget('lj.share', $.lj.basicWidget, {
        options: {
            selectors: {
                // button that activate bubble
                button: '.js-lj-share',
                item: '.b-sharethis-item',
                entry: '.js-lj-share-entry'
            },
            templates: {
                share: 'templates-Widgets-share'
            },
            ml: {
                title: 'sharing.popup.title'
            },
            // should come from server or initialize with defaults above
            services: null,
            // services to show
            links: null
        },

        _create: function () {
            $.lj.basicWidget.prototype._create.call(this);

            // bubble container
            this._container = $('<div />').appendTo( this.element );
            // currently active share button (needed to allow toggle bubble state)
            this._button = null;

            // services option hasn't been initialized explicitly
            if ( !this.options.services ) {

                // initialize from server params
                if (Site && Site.LJShareParams && Site.LJShareParams.services) {
                    this.options.services = Site.LJShareParams.services;
                } else {

                    // use defaults
                    this.options.services = SERVICES;
                }
            }

            // links opition hasn't been initialized explicitly
            if ( !this.options.links ) {

                // initialize from server options
                if (Site && Site.LJShareParams && Site.LJShareParams.links) {
                    this.options.links = Site.LJShareParams.links;
                } else {

                    // use defaults
                    this.options.links = this.options.services ? Object.keys(this.options.services) : [];
                }
            }

            this._bindControls();
        },

        _bindControls: function () {
            var that = this;

            $.lj.basicWidget.prototype._bindControls.call(this);

            // init bubble
            this._container.bubble();

            // click on sharing item inside sharing bubble
            this._container.on('click', this._s('item'), function (e) {
                that._share(e, this);
            });

            // click on sharing button
            this.element.on('click', this._s('button'), function (e) {
                that.shareButtonClick(e, this);
            });

            // click on share entry button
            this.element.on('click', this._s('entry'), function (e) {
                var service,
                    params,
                    link;

                e.preventDefault();

                service = $(this).data('service');
                params = that.getParams(this);
                link = that.createSharingLink(service, params);

                that.shareLink(link, service);
            });

            // handler for all layouts where we could not change html-code
            // and provide needed data-attributes and classname
            this.element.on('click', 'a', function (e) {
                var $this = $(this);

                // only sharing button click handler should work
                if ( $this.is( that._s('button') ) ) {
                    return;
                }

                // only entry click hangler should work
                if ( $this.is( that._s('entry') ) ) {
                    return;
                }

                // only item click handler should work
                if ( $this.is( that._s('item') ) ) {
                    return;
                }

                that.shareButtonClick(e, this, true);
            });
        },

        /**
         * Parse params from target node
         * @param  {HTMLElement}    target Share button node
         * @return {Object}         Params needed for sharing (double encoded)
         */
        getParams: function (target) {
            var data = $(target).data(),
                params = LJ.Object.pick(data, 'url', 'title', 'hashtags', 'text'),

                href,
                args,
                matches;

            // try to parse from link href and query string
            if ( !params.url ) {
                href = target.href,
                args = LiveJournal.parseGetArgs( href );

                if (typeof args.title !== 'undefined') {
                    params.title = args.title;
                }

                if (typeof args.hashtags !== 'undefined') {
                    params.hashtags = args.hashtags;
                }

                if (typeof args.text !== 'undefined') {
                    params.text = args.text;
                }

                matches = href.match(/(.*\.html)/);
                if (matches && matches[1]) {
                    // encode url because other params are escaped and server needs double escaping
                    params.url = encodeURIComponent(matches[1]);
                }

                // we should have title or hashtags inside the query string
                if ( typeof params.title === 'undefined' && typeof params.hashtags === 'undefined' ) {
                    return null;
                }
            }

            // double escape needed params, because server unescapes them during redirect
            // also set default value for params that not provided
            params.url = encodeURIComponent(params.url);
            params.title = encodeURIComponent(params.title || '');
            params.text = encodeURIComponent(params.text || '');

            params.hashtags = params.hashtags || '';

            return params;
        },

        /**
         * Handler for Share button click
         * @param {jQuery.Event} e          jQuery event object
         * @param {HTMLElement}  target     Share button node
         */
        shareButtonClick: function (e, target) {
            var $target = $(target),
                isCurrentButtonPressed = this._button === target,
                params = this.getParams(target);

            // prevent default action only for links sharing could be applied for
            if ( !params ) {
                return;
            }
            e.preventDefault();

            // just hide bubble if it's showed and we click on same share button again
            if (this._container.bubble('visible') && isCurrentButtonPressed) {
                this._container.bubble('hide');
                return;
            }

            // update bubble target and content
            if (this._button !== target) {
                this._setContentFor(params);
                this._container.bubble('option', 'target', $target);
                this._button = target;
            }

            // show bubble
            this._container
                .bubble('block', true) // prevent hiding bubble when click event bubbles to the document
                .bubble('show');

            return this;
        },

        /**
         * Share link handler
         * @param {jQuery.Event} e      jQuery event object
         * @param {HTMLElement} target  Share item link node
         */
        _share: function (e, target) {
            var $target = $(target),
                service = $target.data('service'),
                serviceObj = this.options.services[service];


            if ( !serviceObj ) {
                console.error('Service is not defined.');
                return;
            }

            // if we are trying to open in tab and browser supports it (IE > 8)
            // we should not prevent default action
            if ( !serviceObj.openInTab || ($.browser.msie && $.browser.version < 9) ) {
                e.preventDefault();
            }

            this._container.bubble('hide');
            this.shareLink(target.href, service);
        },

        /**
         * Share link for service
         */
        shareLink: function (url, service) {
            var serviceObj = this.options.services[service],
                width,
                height;


            if ( !serviceObj ) {
                console.error('Service is not defined.');
                return;
            }

            if (serviceObj.openInTab) {
                /**
                 * Notice: Internet Explorer version less than 9 doesn't support
                 *         opening links with target='_blank' in new tab and open
                 *         link in new window by default (depends on settings)
                 *         That's why we simulate this behavior through new window with
                 *         correct width and height params
                 */
                if ($.browser.msie && $.browser.version < 9) {
                    width = $(window).width();
                    height = $(window).height();
                    window.open(url, null, 'toolbar=yes,menubar=yes,status=1,location=yes,scrollbars=yes,resizable=yes,width=' + width + ',height=' + height);
                }
                /**
                 * all other browsers support target='_blank'
                 * and we should do nothing for opening in new tab
                 */
            } else {
                width = serviceObj.width || 640;
                height = serviceObj.height || 480;
                window.open(url, 'sharer', 'toolbar=0,status=0,width=' + width + ',height=' + height + ',scrollbars=yes,resizable=yes');
            }
        },

        /**
         * Create sharing link for exact service
         * @param  {String} service Service for which url should be generated
         * @param  {String} params  Params for url creation (title, url, etc)
         * @return {String}         Sharing link for provided service
         */
        createSharingLink: function (service, params) {
            var serviceObj = this.options.services[service];

            if ( !serviceObj || !serviceObj.bindLink ) {
                console.error('Service parameters error. URL cant be generated.');
                return;
            }

            return serviceObj.bindLink.supplant( params );
        },

        /**
         * Update sharing bubble content
         * @param {Object} params               Object for sharing links construction
         * @param {String} params.url           Url to share
         * @param {String} [params.title]       Title for sharing url (for some services: FB, Twitter, email)
         * @param {String} [params.hashtags]    Hashtags for twitter
         * @param {String} [params.text]        Entry text
         */
        _setContentFor: function (params) {
            var content,
                that = this;

            // update content should always be applied when bubble is hidden
            if ( this._container.bubble('visible') ) {
                this._container.bubble('hide');
            }

            // update bubble content
            content = this._tmpl('share', {
                title: this._ml('title'),
                items: this.options.links.map(function (serviceName) {
                    var service = that.options.services[serviceName],
                        shareURL = service.bindLink.supplant(params);

                    return {
                        service: serviceName,
                        url: shareURL,
                        title: service.title
                    };
                })
            });

            this._container.html(content);
        },

        /**
         * Sharing items inside the bubble
         */
        items: function () {
            return this
                ._container
                .find( this._s('item') );
        },

        /**
         * Hide sharing bubble
         */
        hide: function () {
            this._container.bubble('hide');
        },

        _setOption: function (option, value) {
            if (typeof value === 'undefined') {
                return;
            }

            switch (option) {
                case 'services':
                    this.options.services = $.extend(true, {}, this.options.services || {}, value);
                    break;
                case 'links':
                    this.options.links = value;
                    break;

                // no defaults
            }
        }
    });
}(jQuery));
;

/* file-end: js/jquery/jquery.lj.share.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/ljshare-init.js 
*/

/**
 * @author Valeriy Vasin (valeriy.vasin@sup.com)
 * @description Initialization of share widget (js/jquery/lj.share.js)
 */
;(function ($) {
    'use strict';

    $(function () {
        $(document.body).share();
    });
}(jQuery));
;

/* file-end: js/ljshare-init.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/controlstrip.js 
*/

/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.calendarEvents.js 
*/

( function( $ ) {
	//we think that all such calendars on the page contain the same information
	var ajaxCache = {};

	$.fn.calendarEvents = function( o ) {
		var defaults = {
			calendarType: 'calendar',
			classNames: {
				idle: 'idle'
			},
			fetchOnFirstDisplay: false
		};

		function getCacheKey( year, month ) {
			return "cache_" + year + month;
		}

		function Events( calendarWidget, o ) {
			var widget = this;

			this.calendar = calendarWidget;
			this.events = null;
			this.options = o;

			this._ajaxActive = false;
			this._currentDate;

			var ajaxTimer,
				loadData = function( date, isMonthSwitch ) {
					clearTimeout( ajaxTimer );
					widget._currentDate = getCacheKey( date.getFullYear(), date.getMonth() + 1 );

					ajaxTimer = setTimeout( function() {
						widget.fetchEvents( date.getFullYear(), date.getMonth() + 1, isMonthSwitch );
					}, 200 );
				};
			this.calendar.bind( 'dateChange', function( ev ) {
				var curDate = widget.calendar[ widget.options.calendarType ]( 'option', 'displayedMonth' ),
					isMonthSwitch = Math.abs( 12 * ( ev.date.getFullYear() - curDate.getFullYear() ) + ( ev.date.getMonth() - curDate.getMonth() ) ) === 1;
				loadData( ev.date, isMonthSwitch );
			} );

			if( this.options.fetchOnFirstDisplay ) {
				this.calendar.one( 'calendarshow', function( ev ) {
					loadData( new Date, true );
				} );
			}

		}

		Events.prototype = {
			getEvents: function( year, month, days ) {
				var result = {};
				result[ +year ] = {};
				result[ +year ][ +month -1 ] = days;

				return result;
			},

			/**
			 * Get events from the server end point and update the calendar.
			 *
			 * @param {Number} year
			 * @param {Number} month
			 * @param {Boolean=true} isMonthSwitch Calendar has year and month preloader and it's a flag which preloader to show
			 */
			fetchEvents: function( year, month, isMonthSwitch ) {
				isMonthSwitch = ( arguments.length >= 3 ) ? !!isMonthSwitch : true;
				var widget = this,
					curMonth = this.calendar[ this.options.calendarType ]( 'option', 'displayedMonth' ),
					loaderSpan = this.calendar[ this.options.calendarType ]( 'getElement', ( isMonthSwitch ) ? 'month' : 'year' ),
					idleClass = this.options.classNames.idle,
					timerActive = true,
					checkState = function() {
						if( !widget._ajaxActive && !timerActive ) {
							loaderSpan.removeClass( idleClass );
						}
					}

				this.calendar[ this.options.calendarType ]( 'getElement', 'year' ).removeClass( idleClass );
				this.calendar[ this.options.calendarType ]( 'getElement', 'month' ).removeClass( idleClass );
				loaderSpan.addClass( idleClass );
				this._ajaxActive = true;

				setTimeout( function() {
					timerActive = false;
					checkState();
				}, 500 );

				var cacheKey = getCacheKey( year, month );
					processResults = function( answer ) {
						if( cacheKey !== widget._currentDate ) { return; }

						widget.events = ajaxCache[ cacheKey ];
						// widget.fixBounds();
						widget.calendar[ widget.options.calendarType ]( 'option', 'events',
							widget.getEvents( widget.events.year, widget.events.month, widget.events.days )  );
						widget._ajaxActive = false;

						checkState();
					};

				if( cacheKey in ajaxCache ) {
					processResults( ajaxCache[ cacheKey ] );
				} else {
					$.getJSON( LiveJournal.getAjaxUrl( 'calendar' ), { year: year, month: month }, function( answer ) {
						ajaxCache[ cacheKey ] = answer;
						processResults( answer );
					} );
				}
			}
		}

		return this.each( function() { new Events( $( this ), $.extend( {}, defaults, o ) ) } );
	}
} ) ( jQuery );
;

/* file-end: js/jquery/jquery.calendarEvents.js 
----------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.lj.relations.js 
*/

/* ---------------------------------------------------------------------------------
   file-start: js/hourglass.js 
*/

/**
 * @author Valeriy Vasin (valeriy.vasin@sup.com)
 * @description Create a little animated hourglass.
 */
;(function ($) {
    'use strict';

    /**
     * @class Hourglass
     * @constructor
     */
    function Hourglass() {
        this.element = $('<img />', {
            css: { position: 'absolute', display: 'none', zIndex: 5000 },
            width: 17,
            height: 17,
            src: (Site && Site.imgprefix) ?
                Site.imgprefix + '/hourglass.gif?v=1674' :
                '/img/hourglass.gif?v=1674'
        });

        this.element.appendTo(document.body);

        // name is used for backward compatibility with old widgets
        this.ele = this.element.get(0);

        if (arguments.length) {
            this.init.apply(this, arguments);
        }
    }

    /**
     * Initialize hourglass. Backward compatibility method.
     * @param  {HTMLElement} container  Dom element to show hourglass in
     * @param  {String}      className  Additional classname for the hourglass
     */
    Hourglass.prototype.init = function (container, className) {
        if (typeof className === 'string') {
            this.element.addClass(className);
        }

        if (typeof container !== 'undefined') {
            this.setContainer( container );
            this.show();
        }

        return this;
    };

    /**
     * Set position of for the hourglass
     * @param  {Number} x x-coordinate
     * @param  {Number} y y-coordinate
     */
    Hourglass.prototype.setPosition = function (x, y) {
        this.element.css({
            left: x - 8,
            top: y - 8
        });
        return this;
    };

    /**
     * Set parent element for hourglass
     * @param {HTMLElement} container Container in the center of which hourglass
     *                                will be showed
     */
    Hourglass.prototype.setContainer = function (container) {
        var $container = $(container),
            offset = $container.offset(),
            x = offset.left + $container.width() / 2,
            y = offset.top + $container.height() / 2;

        this.setPosition(x, y);
        return this;
    };

    /**
     * Set event according to which hourglass will be positioned
     * @param {jQuery.Event} e jQuery event
     */
    Hourglass.prototype.setEvent = function (e) {
        if (e.pageX && e.pageY) {
            this.setPosition(e.pageX, e.pageY);
        } else {
            this.setContainer(e.target);
        }
        return this;
    };

    /**
     * Show hourglass element
     */
    Hourglass.prototype.show = function () {
        this.element.show();
        return this;
    };

    /**
     * Hide hourglass element
     */
    Hourglass.prototype.hide = function () {
        this.element.hide();
        // backward compatibility
        this.remove();
        return this;
    };

    /**
     * Remove hourglass element
     */
    Hourglass.prototype.remove = function () {
        this.element.remove();
        return this;
    };

    /**
     * Place hourglass in the center of the element
     * @param {HTMLElement} container Container in the center of which hourglass
     *                                will be showed
     */
    Hourglass.prototype.hourglass_at_widget = function (container) {
        this.setContainer(container);
        this.show();
        return this;
    };

    /**
     * Set position of hourglass and show it. Backward compatibility method.
     * @param  {Number} x x-coordinate
     * @param  {Number} y y-coordinate
     */
    Hourglass.prototype.hourglass_at = function (x, y) {
        this.setPosition(x, y);
        this.show();
        return this;
    };

    /**
     * Add class to hourglass element. Backward compatibility method.
     * Notice: Use instance.element.addClass('my-class') instead
     * @param {String} className Class name
     */
    Hourglass.prototype.add_class_name = function (className) {
        this.element.addClass(className);
        return this;
    };

    // export to global
    window.Hourglass = Hourglass;
}(jQuery));
;

/* file-end: js/hourglass.js 
----------------------------------------------------------------------------------*/

/*global Hourglass */

/**
 * Widget relations
 *
 * @author Valeriy Vasin (valeriy.vasin@sup.com)
 * @fileOverview Manage relations dynamically via links inside the element.
 * @requires  $.ui.widget, $.lj.basicWidget, relations.js
 */
;(function ($) {
    'use strict';

    $.widget('lj.relations', $.lj.basicWidget, {
        options: {
            selectors: {
                addFriend: '.controlstrip-menu-addfriend',
                removeFriend: '.controlstrip-menu-removefriend',
                subscribe: '.controlstrip-menu-subscribe',
                unsubscribe: '.controlstrip-menu-unsubscribe'
            },
            classNames: {
                // user is not friend and not subscribed
                notFriend: 'w-cs-menu-mode-default',
                friend: 'w-cs-menu-mode-friend',
                subscribed: 'w-cs-menu-mode-subscr'
            },

            // username to update relations with
            username: Site.currentJournal,

            // show hourglass when click and delay
            hourglass: true
        },

        _create: function () {
            $.lj.basicWidget.prototype._create.call(this);

            this._allClassNames = [
                this._cl('subscribed'),
                this._cl('notFriend'),
                this._cl('friend')
            ].join(' ');

            this._hourglass = null;

            this._bindControls();
        },

        _bindControls: function () {
            var that = this,
                actions = [
                    'addFriend',
                    'removeFriend',
                    'subscribe',
                    'unsubscribe'
                ];

            $.lj.basicWidget.prototype._bindControls.call(this);

            this.element
                .on('click', this._s('addFriend'), function (e) {
                    e.preventDefault();
                    that._showHourglass(e);
                    LiveJournal.run_hook('relations.change', {
                        username: that.options.username,
                        action: 'addFriend'
                    });
                })
                .on('click', this._s('removeFriend'), function (e) {
                    e.preventDefault();
                    that._showHourglass(e);
                    LiveJournal.run_hook('relations.change', {
                        username: that.options.username,
                        action: 'removeFriend'
                    });
                })
                .on('click', this._s('subscribe'), function (e) {
                    e.preventDefault();
                    that._showHourglass(e);
                    LiveJournal.run_hook('relations.change', {
                        username: that.options.username,
                        action: 'subscribe'
                    });
                })
                .on('click', this._s('unsubscribe'), function (e) {
                    e.preventDefault();
                    that._showHourglass(e);
                    LiveJournal.run_hook('relations.change', {
                        username: that.options.username,
                        action: 'unsubscribe'
                    });
                });

            // Subscribe for updating relations
            LiveJournal.register_hook('relations.changed', function (event) {
                var action = event.action,
                    element = that.element;

                // do not react for not needed actions
                if ( actions.indexOf(action) === -1 ) {
                    return;
                }

                that._hideHourglass();

                if (event && event.data && event.data.error) {
                    console.error(event.data.error.message);
                    return;
                }

                element.removeClass(that._allClassNames);

                if (action === 'addFriend') {
                    element.addClass( that._cl('friend') );
                } else if (action === 'removeFriend' || action === 'unsubscribe') {
                    element.addClass( that._cl('notFriend') );
                } else if (action === 'subscribe') {
                    element.addClass( that._cl('subscribed') );
                }
            });
        },

        /**
         * Show hourglass on click
         * @param  {jQuery.Event} e jQuery event (click)
         */
        _showHourglass: function (e) {
            if ( !this.options.hourglass ) {
                return;
            }

            // hide previous hourglass if it's currently showed
            if (this._hourglass) {
                this._hideHourglass();
            }
            this._hourglass = new Hourglass().setEvent(e).show();
        },

        /**
         * Hide hourglass
         */
        _hideHourglass: function () {
            if (this._hourglass) {
                this._hourglass.remove();
                this._hourglass = null;
            }
        },

        _setOption: function (option, value) {
            if (typeof value === 'undefined') {
                return;
            }
        }
    });
}(jQuery));
;

/* file-end: js/jquery/jquery.lj.relations.js 
----------------------------------------------------------------------------------*/

/*global ContextualPopup */
/**
 * @author Valeriy Vasin (valeriy.vasin@sup.com)
 * @description Control strip functionality
 */
;(function ($) {
    'use strict';

    /**
     * Add community filter functionality for control strip
     */
    function initFilter() {
        var bubble,
            form,
            input,
            submit;

        // filter is available only for logged in users
        if ( !Site.remoteUser ) {
            return;
        }

        bubble = $('#lj_controlstrip_new .w-cs-filter-inner');

        // exit if filter content is not currently on the page
        if ( bubble.length === 0 ) {
            return;
        }

        form = $('#sortByPoster');
        input = form.find('[name=poster]');
        submit = form.find('[type=image]');

        bubble.bubble({
            target: '#lj_controlstrip_new .w-cs-filter-icon',
            showOn: 'click',
            closeControl: false
        });

        input.input(function () {
            if( this.value.length ) {
                submit.css('opacity', 1)
                    .prop('disabled', false);
            } else {
                submit.css('opacity', 0)
                    .prop('disabled', true);
            }
        });

        form.on('submit', function (e) {
            if( !input.val().length ) {
                e.preventDefault();
            }
        });
    }

    /**
     * Add labled placeholders for the control strip
     */
    function addLabledPlaceholders() {
        $('#lj_controlstrip_new input[placeholder]').labeledPlaceholder();
    }

    /**
     * Initialize control strip
     */
    function init() {
        initFilter();
        addLabledPlaceholders();

        if ( LJ.Flags.isEnabled('friendsAndSubscriptions') ) {
            $('.w-cs-menu-friends-subscr').relations();

            LiveJournal.register_hook('relations.changed', function (event) {
                var data = event.data,
                    status = null;

                if (data.controlstrip_status) {
                    status = $('.js-controlstrip-status');

                    // Hide contextual popup before
                    // If you're trying to change status from contextual popup in control strip
                    if ( ContextualPopup.currentElement === status.find('.ljuser img').get(0) ) {
                        ContextualPopup.hide();
                    }

                    status
                        .html(data.controlstrip_status);
                }
            });
        }
    }

    $(function () {
        // load control strip if it's not available on document ready
        // Notice: some s2 users could turn off control strip for all users
        if (!document.getElementById('lj_controlstrip') && !document.getElementById('lj_controlstrip_new')) {
            // fetch control strip from server
            $.get(
                LiveJournal.getAjaxUrl('controlstrip'),
                { user: Site.currentJournal },
                function (data) {
                    $(data).appendTo(document.body);
                    init();
                }
            );
        } else {
            init();
        }
    });

}(jQuery));
;

/* file-end: js/controlstrip.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.lj.repostbutton.js 
*/

/**
 * @name $.lj.repostbutton
 * @requires $.ui.core, $.ui.widget, $.lj.basicWidget, $.lj.bubble
 * @class Represents repost button
 * @author dmitry.petrov@sup.com (Dmitry Petrov), anazarov@sup.com (Alexander Nazarov)
 */
(function($, window) {
	'use strict';

	/** @lends $.lj.repostbutton.prototype */
	$.widget('lj.repostbutton', $.lj.basicWidget, {
		options: {
			classNames: {
				active: 'repost-button-active',
				inactive: 'repost-button-inactive',
				popupLoad: 'b-reposted-popup-load',
				popupNomore: 'b-reposted-popup-footer-hide',
				repostError: 'repost-error'
			},

			selectors: {
				counterParent: '.lj-button-c',
				button: '.lj-button-b',
				counter: '.lj-like-item-count',
				buttonLink: '.lj-button-link',
				popupContent: '.b-reposted-popup-content',
				popupFooter: '.b-reposted-popup-footer',
				popupMore: '.b-reposted-popup-footer > a'
			},

			templates: {
				popup: 'templates-CleanHtml-reposted'
			},

			url: '',
			reposted: false,
			cost: 0,
			budget: 0,
			paid: false
		},

		_create: function() {
			$.lj.basicWidget.prototype._create.apply(this);

			if (!this.options.url) {
				LJ.console.warn(this.widgetName, ': no url in options, initialization won\'t continue');
			}

			this._journal = LJ.pageVar('currentJournal', true);
			this._count = null;
			this._remote = LJ.pageVar('remoteUser', true);
			this._reposted = this.options.reposted;
			this._el('buttonLink');
			this._href = this.element.find(this._s('button')).data('href');
			this._href = LJ.Util.Journal.parseLink(this._href) || {};

			if (!this._canRepost()) {
				this.element.addClass(this._cl('inactive'));
				this._buttonLink.removeAttr('title');
				this._lock();
			}

			this._popup = null;
			this._popupContent = null;
			this._popupLocked = false;
			this._lastUser = null;
			this._el('counterParent');
			this._el('counter');

			if (!Number(this._counter.html())) { this._hideCounter(); }

			this._bindControls();
		},

		_hideCounter: function () {
			this._counterParent.addClass('empty');
		},

		_showCounter: function () {
			this._counterParent.removeClass('empty');
		},

		_bindControls: function() {
			var repost = this;

			this.element.on('click', this._s('button'), this._onUpdateButton.bind(this));

			this._counterParent.one('click', function(ev) {
				if (!Number(repost._counter.html())) { return; }

				repost._popup = repost._tmpl('popup');
				repost._el('popupFooter', repost._popup);
				repost._popupContent = repost._popup.find(repost._s('popupContent'));

				repost._popup.bubble({
					showOn: 'click',
					align: 'side',
					alwaysShowUnderTarget: true,
					target: repost._counterParent
				})
				.on('bubblehide', function () {
					repost._lastUser = null;
					repost._popupContent.empty();
					repost._popupFooter.removeClass(repost._cl('popupNomore'));
				})
				.on('bubbleshow', function () {
					repost._loadRepostedList();
				})
				.on('click', repost._s('popupMore'), repost._loadRepostedList.bind(repost));

				Function.defer(function() {
					repost._popup.bubble('show');
				});
			});

			$.lj.basicWidget.prototype._bindControls.apply(repost);
		},

		_loadRepostedList: function(ev) {
			var repost = this;

			if (ev) { ev.preventDefault(); }
			if (this._popupLocked) { return; }

			this._popupLocked = true;
			this._popupContent.addClass(this._cl('popupLoad'));

			LJ.Api.call('repost.get_list', { url: this.options.url, last: this._lastUser }, function(answer) {
				repost._popupContent.removeClass(repost._cl('popupLoad'));
				repost._popupLocked = false;
				if (answer.error) {
					repost._handleAnswer(answer);
				} else {
					repost._render(answer.users, answer.nomore, answer.count);
					repost._lastUser = answer.last;
				}
			});
		},

		_render: function(users, nomore, count) {
			var repost = this;

			/* Display users */
			if (users.length > 0) {
				repost._tmpl('popup', {
					content: true,
					dropComma: !!repost._lastUser,
					users: users
				}).appendTo(repost._popupContent);
			}

			this._updateCounter(count);

			/* Hide 'Show More' button */
			if (nomore) {
				repost._popupFooter.addClass(repost._cl('popupNomore'));
			}
		},

		_onUpdateButton: function(ev) {
			if (!this.locked()) {
				this.toggleRepost();
			}
			ev.preventDefault();
		},

		_handleAnswer: function(answer) {
			if (answer.hasOwnProperty('delete')) {
				if (answer.message) {
					this._showMessage(answer.message);
				}

				/* LJSUP-13479: Repost type or cost changed */
				if (this.paid !== !!answer.paid || this.paid && (this.cost !== answer.cost)) {
					this.element.replaceWith(LiveJournal.renderRepostButton(this.options.url, answer));
					return;
				}
			}

			if (answer.error) {
				if (answer.error.message) {
					this._showMessage(answer.error.message);
				}

				if (answer.error.data) {
					// Redraw button completely with new data
					this.element.replaceWith(LiveJournal.renderRepostButton(this.options.url, answer.error.data));
					return;
				}
			} else {
				this._updateButton( !this._reposted );
			}

			if (!answer.hasOwnProperty('count') && answer.hasOwnProperty('delete')) {
				answer.count = this._count - 1;
			}

			this._updateCounter(answer.count);
			this._unlock();
		},

		_showMessage: function (message) {
			var errorBubble = $('<div />', {
				'class': this._cl('repostError'),
				text: message
			})
			.bubble({
				target: this.element,
				align: 'center',
				hide: function () {
					errorBubble.remove();
				}
			})
			.bubble('show');
		},

		_updateButton: function(reposted) {
			this._reposted = reposted;
			this.element.toggleClass(this._cl('active'), this._reposted);
		},

		_updateCounter: function (count) {
			if (typeof count !== 'undefined') {
				this._count = Number(count);
				this._counter.html(this._count);
			}

			if (!Number(this._counter.html())) {
				this._hideCounter();
			} else {
				this._showCounter();
			}
		},

		_canRepost: function () {
			if (LJ.pageVar('preview')) { return false; }
			if (!this._remote) { return false; }
			if (LJ.pageVar('remote_is_identity', true)) { return false; }
			if (this._remote === this._href.journal) { return false; }

			return true;
		},

		toggleRepost: function() {
			var repost = this,
				args = {
					url: this.options.url
				};

			if (!this._canRepost()) { return; }

			if (this._count === null) {
				this._count = parseInt( this._el('counter').html(), 10) || 0;
			}

			this._lock();
			if (this._reposted) {
				LJ.Api.call('repost.delete', args, function (answer) {
					/* LJSUP-12559: Reload page when repost is deleted in remote user's journal */
					if (!answer.error && !answer.reposted && repost._journal === repost._remote && !location.href.match(/\/friends(?:friends|times)?\b/)) {
						location.reload();
					} else {
						repost._handleAnswer(answer);
					}
				});
			} else {
				args.timezone = LJ.Util.Date.timezone();

				if (this.options.paid) {
					args.cost = this.options.cost;
				}

				LJ.Api.call('repost.create', args, this._handleAnswer.bind(this));
			}
		}
	});
}(jQuery, this));

;

/* file-end: js/jquery/jquery.lj.repostbutton.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/s2.js 
*/

;(function (window, $) {
    'use strict';

    LiveJournal.register_hook('page_load', function() {
        var sidebarCalendar = $('.sidebar-cal');

        /* Nothing to do if widget was not loaded */
        if ( !$.fn.hasOwnProperty('inlineCalendar') ) {
            return;
        }

        // inline calendar could not be available for the style
        sidebarCalendar
            .inlineCalendar( {
                selectors: {
                    month: '.sbar-cal-nav-month',
                    year:  '.sbar-cal-nav-year',

                    prevMonth: '.sbar-cal-nav-month .sbar-cal-nav-prev',
                    nextMonth: '.sbar-cal-nav-month .sbar-cal-nav-next',
                    prevYear:  '.sbar-cal-nav-year .sbar-cal-nav-prev',
                    nextYear:  '.sbar-cal-nav-year .sbar-cal-nav-next',

                    monthLabel: '.sbar-cal-nav-month .sbar-cal-month',
                    yearLabel: '.sbar-cal-nav-year .sbar-cal-year'
                },
                classNames: {
                    current  : 'today',
                    nextDisabled : 'disabled',
                    prevDisabled : 'disabled'
                },
                dayRef: Site.currentJournalBase + '/%Y/%M/%D',
                monthRef: Site.currentJournalBase + '/%Y/%M',
                yearRef: Site.currentJournalBase + '/%Y',
                endMonth: new Date(),
                startAtSunday: true
            }).on('daySelected', function (event) {
                event.preventDefault();
            });

        // calendar events should be available
        if ( $.fn.hasOwnProperty('calendarEvents') ) {
            sidebarCalendar.calendarEvents({
                calendarType: 'inlineCalendar'
            });
        }
    });

    LiveJournal.register_hook('page_load', function () {
        var className = 'hover',
            tabElements = $('.sidebar dl'),
            tabHeaders = $('.sidebar dt'),
            preventClose = false;

        if ($('.sidebar-friendstimes').length === 0) { return; }

        if (LJ.Support.touch) {
            tabHeaders.on('touchstart', function () {
                $(this).parent()
                    .toggleClass(className)
                    .siblings()
                    .removeClass(className);
            });
            tabElements.on('touchstart', function () {
                preventClose = true;
            });
            $(document).on('touchstart', function () {
                if (preventClose) {
                    preventClose = false;
                } else {
                    tabElements.removeClass(className);
                }
            });
        } else {
            tabElements.on({
                mouseenter: function () {
                    $(this).addClass('hover');
                },

                mouseleave: function () {
                    $(this).removeClass('hover');
                }
            });
        }
    });

    function removeRepost(url) {
        LJ.Api.call('repost.delete', { url: url }, function(answer) {
            if (answer.error) {
                LiveJournal.ajaxError(answer.error.message);
            } else {
                location.reload();
            }
        });
    }

    function initPopup(node, onconfirm) {
        $(node).confirmbubble({
            confirmText: LJ.ml('repost.confirm.delete'),
            confirm: onconfirm || $.noop
        });
    }

    LiveJournal.register_hook('repost.requestRemove', function(node, url) {
        initPopup(node, removeRepost.bind(null, url));
    });

    // Ad for test users: #LJSUP-15662
    $(function () {
        var slot = $('.j-slot');

        if (!slot.length || Cookie('advs2ptt'))  {
            return;
        }

		// add close handler
        slot.on('click', '.j-slot-close', function () {
            var expires = new Date();

            // release cookie time: 00:00:01 of tomorrow
            expires.setDate( expires.getDate() + 1 );
            expires.setHours(0);
            expires.setMinutes(0);
            expires.setSeconds(1);

            slot.remove();
            Cookie('advs2ptt', '1', {
                expires: expires,
                domain: Site.siteroot.replace(/^https?:\/\/www\./, ''),
                path: '/'
            });

            var random = Math.floor(Math.random() * 1000000);
            (new Image()).src = 'http://sup.adfox.ru/7386/getCode?p1=blrqa&p2=v&ptrc=b&pfc=rtvz&pfb=bxome&puid1=&puid2=&puid3=&puid4=&puid5=&pr=' + random;
        });
    });


    //
    // LJ Art
    //
    $(function () {
        // announcements toggler
        $('.js-toggle-visibility').on('click', function () {
            var selector = '.' + $(this).data('show');

            $(selector).toggle('slow');
            $(this).toggleClass('j-p-is-opened');
        });

        // sidebar label switcher
        (function () {
            var currentClass = 'j-w-lists-controls-item-current',
                hiddenClass = 'j-p-hidden',
                controls = $('.j-w-lists-controls'),
                labels = $('.j-w-lists-wrapper > ul');

            controls.on('click', 'li', function () {
                var $this = $(this);

                if ( $this.hasClass(currentClass) ) {
                    return;
                }

                $this
                    .addClass(currentClass)
                    .siblings()
                    .removeClass(currentClass);

                labels
                    .filter('.' + $this.data('show'))
                    .removeClass(hiddenClass)
                    .siblings()
                    .addClass(hiddenClass);
            });
        }());

        // gallery
        ;(function () {
            $('.j-gallery').each(function () {
                var gallery = $(this),
                    bigImageWrapper = gallery.find('.j-gallery-bigimage-wrapper'),
                    previewWrapper = gallery.find('.j-gallery-list'),
                    bigImage = bigImageWrapper.find('img'),
                    links = bigImageWrapper.find('a'),
                    title = bigImageWrapper.find('.j-gallery-bigimage-title a');


                previewWrapper.on('click', 'img', function () {
                    var img = $(this);

                    bigImage.attr('src', img.data('bigimage'));
                    links.attr('href', img.data('permalink'));
                    title.text( img.data('subject') );
                });
            });
        }());
    });
}(window, jQuery));
;

/* file-end: js/s2.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/esn.js 
*/

var ESN = {};
(function ($, ESN) {
    // When page loads, set up "check all" checkboxes
    ESN.initCheckAllBtns = function () {
      var ntids  = $("ntypeids");
      var catids = $("catids");

      if (!ntids || !catids)
        return;

      ntidList  = ntids.value;
      catidList = catids.value;

      if (!ntidList || !catidList)
        return;

      ntids  = ntidList.split(",");
      catids = catidList.split(",");

      catids.forEach( function (catid) {
        ntids.forEach( function (ntypeid) {
          var className = "SubscribeCheckbox-" + catid + "-" + ntypeid;

          var cab = new CheckallButton();
          cab.init({
            "class": className,
              "button": $("CheckAll-" + catid + "-" + ntypeid),
              "parent": $("CategoryRow-" + catid)
              });
        });
      });
    }

    // attach event handlers to all track buttons
    ESN.initTrackBtns = function (node) {
        // don't do anything if no remote
        if (!Site.has_remote) return;

        node = node || document;
        var trackBtns = DOM.getElementsByTagAndClassName(node, 'img', 'TrackButton');

        trackBtns.forEach(function (trackBtn) {
            if (!trackBtn || !trackBtn.getAttribute) return;

            if (!trackBtn.getAttribute("lj_subid") && !trackBtn.getAttribute("lj_journalid")) return;
            if (trackBtn.getAttribute("lj_dtalkid") && !Site.remote_can_track_threads) return;

            DOM.addEventListener(trackBtn, 'click', ESN.trackBtnClickHandler.bindEventListener(trackBtn));
        });
    };

    ESN.trackBtnClickHandler = function (evt) {
        var trackBtn = evt.target;
        if (! trackBtn || trackBtn.tagName.toLowerCase() != "img") return true;

        Event.stop(evt);

        var btnInfo = {};

        ['arg1', 'arg2', 'etypeid', 'newentry_etypeid', 'newentry_token', 'newentry_subid',
         'journalid', 'subid', 'auth_token'].forEach(function (arg) {
            btnInfo[arg] = trackBtn.getAttribute("lj_" + arg);
        });

        // pop up little dialog to either track by inbox/email or go to more options
        var dlg = document.createElement("div");
        var title = _textDiv("Email me when");
        DOM.addClassName(title, "track_title");
        dlg.appendChild(title);

        var TrackCheckbox = function (title, checked) {
            var checkContainer = document.createElement("div");

            var newCheckbox = document.createElement("input");
            newCheckbox.type = "checkbox";
            newCheckbox.id = "newentrytrack" + Unique.id();
            var newCheckboxLabel = document.createElement("label");
            newCheckboxLabel.setAttribute("for", newCheckbox.id);
            newCheckboxLabel.innerHTML = title;

            checkContainer.appendChild(newCheckbox);
            checkContainer.appendChild(newCheckboxLabel);
            dlg.appendChild(checkContainer);

            newCheckbox.checked = checked ? true : false;

            return newCheckbox;
        };

        // global trackPopup so we can only have one
        if (ESN.trackPopup) {
            ESN.trackPopup.hide();
            ESN.trackPopup = null;
        }

        var saveChangesBtn = document.createElement("input");
        saveChangesBtn.type = "button";
        saveChangesBtn.value = "Save Changes";
        DOM.addClassName(saveChangesBtn, "track_savechanges");

        var trackingNewEntries  = Number(btnInfo['newentry_subid']) ? 1 : 0;
        var trackingNewComments = Number(btnInfo['subid']) ? 1 : 0;

        var newEntryTrackBtn;
        var commentsTrackBtn;

        if (trackBtn.getAttribute("lj_dtalkid")) {
            // this is a thread tracking button
            // always checked: either because they're subscribed, or because
            // they're going to subscribe.
            commentsTrackBtn = TrackCheckbox("someone replies in this comment thread", 1);
        } else {
            // entry tracking button
    		newEntryTrackBtn = TrackCheckbox(Site.currentJournal + ' posts a new entry', trackingNewEntries);
            commentsTrackBtn = TrackCheckbox("someone comments on this post", trackingNewComments);
        }

        DOM.addEventListener(saveChangesBtn, "click", function () {
            ESN.toggleSubscriptions(btnInfo, evt, trackBtn, {
                newEntry: newEntryTrackBtn ? newEntryTrackBtn.checked : false,
                newComments: commentsTrackBtn.checked
            });
            if (ESN.trackPopup) ESN.trackPopup.hide();
        });

        var btnsContainer = document.createElement("div");
        DOM.addClassName(btnsContainer, "track_btncontainer");
        dlg.appendChild(btnsContainer);

        btnsContainer.appendChild(saveChangesBtn);

        var custTrackLink = document.createElement("a");
        custTrackLink.href = trackBtn.parentNode.href;
        btnsContainer.appendChild(custTrackLink);
        custTrackLink.innerHTML = "More Options";
        DOM.addClassName(custTrackLink, "track_moreopts");

        ESN.trackPopup = new LJ_IPPU.showNoteElement(dlg, trackBtn, 0);

        DOM.addEventListener(custTrackLink, "click", function (evt) {
            Event.stop(evt);
            document.location.href = trackBtn.parentNode.href;
            if (ESN.trackPopup) ESN.trackPopup.hide();
            return false;
        });

        return false;
    }

    // toggles subscriptions
    ESN.toggleSubscriptions = function (subInfo, evt, btn, subs) {
        subInfo["subid"] = Number(subInfo["subid"]);
        if ((subInfo["subid"] && ! subs["newComments"])
            || (! subInfo["subid"] && subs["newComments"])) {
            ESN.toggleSubscription(subInfo, evt, btn, "newComments");
        }

        subInfo["newentry_subid"] = Number(subInfo["newentry_subid"]);
        if ((subInfo["newentry_subid"] && ! subs["newEntry"])
            || (! subInfo["newentry_subid"] && subs["newEntry"])) {
                var newentrySubInfo = new Object(subInfo);
                newentrySubInfo["subid"] = Number(btn.getAttribute("lj_newentry_subid"));
                ESN.toggleSubscription(newentrySubInfo, evt, btn, "newEntry");
        }
    };

    // (Un)subscribes to an event
    ESN.toggleSubscription = function (subInfo, evt, btn, sub) {
        var action = "";
        var params = {
            auth_token: sub == "newEntry" ? subInfo.newentry_token : subInfo.auth_token
        };

        if (Number(subInfo.subid)) {
            // subscription exists
            action = "delsub";
            params.subid = subInfo.subid;
        } else {
            // create a new subscription
            action = "addsub";

            var param_keys;
            if (sub == "newEntry") {
                params.etypeid = subInfo.newentry_etypeid;
                param_keys = ["journalid"];
            } else {
                param_keys = ["journalid", "arg1", "arg2", "etypeid"];
            }

            param_keys.forEach(function (param) {
                if (Number(subInfo[param]))
                    params[param] = parseInt(subInfo[param]);
            });
        }

        params.action = action;

        var reqInfo = {
            "method": "POST",
            "url":    LiveJournal.getAjaxUrl('esn_subs'),
            "data":   HTTPReq.formEncoded(params)
        };

        var gotInfoCallback = function (info) {
            if (! info) return LJ_IPPU.showNote("Error changing subscription", btn);

            if (info.error) return LJ_IPPU.showNote(info.error, btn);

            if (info.success) {
                if (info.msg)
                    LJ_IPPU.showNote(info.msg, btn);

                if (info.subscribed) {
                    if (info.subid)
    					btn.setAttribute('lj_subid', info.subid);
                    if (info.newentry_subid)
    					btn.setAttribute('lj_newentry_subid', info.newentry_subid);

    				btn.setAttribute('title', 'Untrack This');

                    // update subthread tracking icons
                    var dtalkid = btn.getAttribute("lj_dtalkid");
                    if (dtalkid)
                        ESN.updateThreadIcons(dtalkid, "on");
                    else // not thread tracking button
                        btn.src = Site.imgprefix + "/btn_tracking.gif?v=17312";
                } else {
                    if (info["event_class"] == "LJ::Event::JournalNewComment")
    					btn.setAttribute('lj_subid', 0);
                    else if (info["event_class"] == "LJ::Event::JournalNewEntry")
    					btn.setAttribute('lj_newentry_subid', 0);

    				btn.setAttribute('title', 'Track This');

                    // update subthread tracking icons
                    var dtalkid = btn.getAttribute("lj_dtalkid");
                    if (dtalkid) {
                        // set state to "off" if no parents tracking this,
                        // otherwise set state to "parent"
                        var state = "off";
                        var parentBtn;
                        var parent_dtalkid = dtalkid;
                        while (parentBtn = ESN.getThreadParentBtn(parent_dtalkid)) {
                            parent_dtalkid = parentBtn.getAttribute("lj_dtalkid");
                            if (! parent_dtalkid) {
                                break;
                            }

                            if (! Number(parentBtn.getAttribute("lj_subid")))
                                continue;
                            state = "parent";
                            break;
                        }

                        ESN.updateThreadIcons(dtalkid, state);
                    } else {
                        // not thread tracking button
                        btn.src = Site.imgprefix + "/btn_track.gif?v=17312";
                    }
                }

                if (info.auth_token)
    				btn.setAttribute('lj_auth_token', info.auth_token);
                if (info.newentry_token)
    				btn.setAttribute('lj_newentry_token', info.newentry_token);
            }
        };

        reqInfo.onData = gotInfoCallback;
        reqInfo.onError = function (err) { LJ_IPPU.showNote("Error: " + err) };

        HTTPReq.getJSON(reqInfo);
    };

    // given a dtalkid, find the track button for its parent comment (if any)
    ESN.getThreadParentBtn = function (dtalkid) {
        var cmtInfo = LJ_cmtinfo[dtalkid + ""];
        if (! cmtInfo) {
            return null;
        }

        var parent_dtalkid = cmtInfo.parent;
        if (! parent_dtalkid)
            return null;

        return $("lj_track_btn_" + parent_dtalkid);
    };

    // update all the tracking icons under a parent comment
    ESN.updateThreadIcons = function (dtalkid, tracking) {
        var btn = $("lj_track_btn_" + dtalkid);
        if (! btn) {
            return;
        }

        var cmtInfo = LJ_cmtinfo[dtalkid + ""];
        if (! cmtInfo) {
            return;
        }

        if (Number(btn.getAttribute("lj_subid")) && tracking != "on") {
            // subscription already exists on this button, don't mess with it
            return;
        }

        if (cmtInfo.rc && cmtInfo.rc.length) {
            // update children
            cmtInfo.rc.forEach(function (child_dtalkid) {
                window.setTimeout(function () {
                    var state;
                    switch (tracking) {
                    case "on":
                        state = "parent";
                        break;
                    case "off":
                        state = "off";
                        break;
                    case "parent":
                        state = "parent";
                        break;
                    default:
                        alert("Unknown tracking state " + tracking);
                        break;
                    }
                    ESN.updateThreadIcons(child_dtalkid, state);
                }, 300);
            });
        }

        // update icon
        var uri;
        switch (tracking) {
            case "on":
                uri = "/btn_tracking.gif?v=17312";
                break;
            case "off":
                uri = "/btn_track.gif?v=17312";
                break;
            case "parent":
                uri = "/btn_tracking_thread.gif?v=17312";
                break;
            default:
                alert("Unknown tracking state " + tracking);
                break;
        }

        btn.src = Site.imgprefix + uri;
    };

    jQuery(function($)
    {
        ESN.initCheckAllBtns();
        ESN.initTrackBtns();
    
        $('#settings_form').on('click', 'a.delete-group', function(e) {
        
            var match = this.search.match(/delete_group=([-\d]+)/),
                group = match ? match[1] : null;
            
            e.preventDefault();
            
            if (!group) {
                return;
            }
            
            $.post(location.href, {
                delete_group: group
            });
            
            $(this).closest('tr').remove();
        });
    });
}(DOM.getElement, ESN));
;

/* file-end: js/esn.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.lj.confirmbubble.js 
*/

 /**
 * @author dmitry.petrov@sup.com (Dmitry Petrov)
 * @fileoverview LiveJournal confirmbubble widget.
 */

/**
 * @name $.lj.confirmbubble
 * @requires $.ui.core, $.ui.widget, $.lj.basicWidget
 * @class Widget shows confirmation dialog when user click on node
 */
(function($, window) {

	/** @lends $.lj.confirmbubble.prototype */
	$.widget('lj.confirmbubble', $.lj.basicWidget, {
		options: {
			selectors: {
				ok: '.b-popup-btn',
				cancel: '.b-popup-cancel',
				check: '.b-popup-check'
			},

			templates: {
				content: 'templates-Widgets-popupcontent'
			},

			confirm: jQuery.noop,
			confirmText: '',
			yesText: '',
			noText: '',
			checkText: '',
			headerText: '',
			showCheck: false,
			showHeader: false
		},

		_create: function() {
			$.lj.basicWidget.prototype._create.apply(this);

			this._content = this._tmpl('content', {
				confirm_text: this.options.confirmText,
				yes_text: this.options.confirmYes || LJ.ml('confirm.bubble.yes'),
				no_text: this.options.confirmNo || LJ.ml('confirm.bubble.no'),
				show_check: this.options.showCheck,
				show_header: this.options.showHeader,
				header_text: this.options.headerText,
				check_text: this.options.checkText
			});

			this._bindControls();

			this._content.bubble({
				showOn: 'click',
				target: this.element
			});

			if (this.options.showCheck) {
				this._content.find(this._s('ok')).attr('disabled', true);
			}

			//this may be disabled from options later
			Function.defer(this._content.bubble.bind(this._content,'show'));
		},

		_bindControls: function() {
			var bubble  = this,
				content = this._content,
				ok      = content.find(this._s('ok')),
				options = this.options;

			$.lj.basicWidget.prototype._bindControls.apply(this);

			content
				.on('click', this._s('ok'), function(ev) {
					content.bubble('hide');
					options.confirm();
				})
				.on('change', this._s('check'), function(ev) {
					if ($(this).attr('checked')) {
						ok.removeAttr('disabled');
					} else {
						ok.attr('disabled', true);
					}
				})
				.on('click', this._s('cancel'), function(ev) {
					content.bubble('hide');
				})
				.on('bubblehide', function(ev) {
					bubble._trigger('hide');
				})
				.on('bubbleshow', function(ev) {
					bubble._trigger('show');
				});
		},

		show: function() {
			this._content.bubble('show');
		},

		hide: function() {
			this._content.bubble('hide');
		}
	});
})(jQuery, this);
;

/* file-end: js/jquery/jquery.lj.confirmbubble.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.lj.ljcut.js 
*/

/**
 * @author Valeriy Vasin (valeriy.vasin@sup.com)
 * @name $.lj.ljcut
 * @requires $.ui.core, $.ui.widget, $.lj.basicWidget, LJ
 * @class The widget is responsible for expanding cuts
 */
;(function ($) {
	"use strict";

	$.widget('lj.ljcut', $.lj.basicWidget, {
		options: {
			// journal identifier (comes from server)
			journalid: null,
			// post identifier (comes from server)
			ditemid: null,
			// cut identifier inside of the post (comes from server)
			cutid: null,
			// server request param: use placeholders or not (1 or 0). Comes from server
			placeholders: 0,

			selectors: {
				expand: '.ljcut-link-expand',
				collapse: '.ljcut-link-collapse'
			},
			classNames: {
				preloader: 'ljcut-link-expanding',
				expanded: 'ljcut-expanded'
			}
		},

		_create: function () {
			$.lj.basicWidget.prototype._create.apply(this);

			// jQuery element that will contain loaded content of the cut
			this.content = null;
			// test OS for Mac
			this._isMac = (/Mac/).test(navigator.userAgent);
			// $.browser.opera is deprecated
			this._isOpera = (/Opera/.test(navigator.userAgent));

			this._bindControls();
		},

		_bindControls: function () {
			$.lj.basicWidget.prototype._bindControls.apply(this);

			this.element.on('click', this._s('expand'), this._expand.bind(this));
			this.element.on('click', this._s('collapse'), this._collapse.bind(this));
			$(document).on('keydown', this._shortcuts.bind(this));
		},

		/**
		 * Shortcuts handler
		 * @param  {Object} e jQuery event object
		 */
		_shortcuts: function (e) {
			var ctrl = (this._isMac && this._isOpera) ? e.metaKey : e.ctrlKey,
				alt = e.altKey;

			if (!ctrl || !alt) {
				return;
			}

			switch (e.which) {
				// expand: ctrl + alt + "+"
				case 61: // FireFox, IE
					// fall through
				case 187: // Opera, Chrome, Safari
					this.expand();
					break;

				// collapse: ctrl + alt + "-"
				case 173: // FireFox
					// fall through
				case 31: // Opera Mac
					// fall through
				case 109: // Opera Windows
					// fall through
				case 189: // Chrome, Safari
					this.collapse();
					break;

				// no default
			}
			e.preventDefault();
		},

		/**
		 * Show or hide preloader
		 * @param  {Boolean} state Preloader state: True (show) or False (hide)
		 */
		_togglePreloader: function (state) {
			this.element.toggleClass( this._cl('preloader'), state );
		},

		/**
		 * Toggle content state
		 * @param  {Boolean} state State of content: expand (true) or collapse (false)
		 */
		_toggleContent: function (state, callback) {
			var that = this;

			if (this.locked() || !this.content) {
				return;
			}

			this._lock();
			if (typeof callback !== 'function') {
				callback = $.noop;
			}

			that.element.toggleClass( that._cl('expanded'), state );
			if (state) {
				this.content.slideDown('fast', function () {
					that._trigger('show', null, that);
					callback();
					that._unlock();
				});
			} else {
				this.content.slideUp(50, function () {
					that._trigger('hide', null, that);
					callback();
					that._unlock();
				});
			}
		},

		/**
		 * Request server for the cut content
		 * @param  {Object} data Data that is needed for request
		 */
		_requestContent: function (data) {
			var that = this;

			this._lock();
			this._togglePreloader(true);
			LJ.Api.call('event.get_lj_cut', data, function (response) {
				that.content = $('<div />', { html: response.text }).hide();
				that.element.after( that.content );
				that._unlock();
				that._togglePreloader(false);

				// add handlers after content becomes visible
				that._toggleContent(true, that._addHandlers.bind(that));

				// statistic
				if (response.counter_image_url) {
					LJ.Stat.addCounter(response.counter_image_url);
				}
			});
		},

		/**
		 * Provide dynamic behavior for the content (javascript handlers)
		 * @private
		 */
		_addHandlers: function () {
			this.content.ljLikes();
		},

		/**
		 * Expand content
		 */
		expand: function () {
			if ( this.locked() ) {
				return;
			}
			if ( this.content ) {
				this._toggleContent(true);
			} else {
				this._requestContent({
					journalid: this.options.journalid,
					ditemid: this.options.ditemid,
					cutid: this.options.cutid,
					placeholders: this.options.placeholders
				});
			}
		},

		/**
		 * Collapse content (for external usage)
		 */
		collapse: function () {
			if ( !this.locked() ) {
				this._toggleContent(false);
			}
		},

		/**
		 * Expand link click handler
		 * @param  {Object} e jQuery event object
		 */
		_expand: function (e) {
			// open link in new tab
			if (e.metaKey || e.ctrlKey) {
				return true;
			}
			e.preventDefault();
			this.expand();
		},

		/**
		 * Collapse link click handler
		 * @param  {Object} e jQuery event object
		 */
		_collapse: function (e) {
			// open link in new tab
			if (e.metaKey || e.ctrlKey) {
				return true;
			}
			e.preventDefault();
			this.collapse();
		}
	});
}(jQuery));;

/* file-end: js/jquery/jquery.lj.ljcut.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/fb-select-image.js 
*/

jQuery(function() {
	var fbInput = $('repost_facebook'),
		thumb = $('repost_facebook_thumbnail'),
		selectUpdate = $('select-fb-thumbnail'),
		selectComments = $('select-fb-thumbnail-comments'),
		userPic = $('userpic_preview_image'),
		selectWindow = $('fbimg_select_window'),
		selectNav = $('fbimg_select_window_nav'),
		select = selectUpdate || selectComments;

	var noThumb = "nothumb";
	var userpicVal = "userpic";

	if(select == null) {
		return;
	}

	var options = {};
	if(selectUpdate) {
		options = {
			getText: function() {
				if(window.switchedRteOn){
					return CKEDITOR.instances.draft.getData();
				} else {
					return jQuery('#draft').val();
				}
			},
			getUserPic: function() {
				return (userPic) ? userPic.src : "";
			}
		};
	}
	else {
		options = {
			getText: function() {
				var txtArea = $('commenttext') || $('body');
				return txtArea.value;
			},
			getUserPic: function() {
				var upicSelect = jQuery('#userpics > [name=prop_picture_keyword]');
				if(upicSelect.length == 0) {
					upicSelect = jQuery('#prop_picture_keyword');
				}

				if(upicSelect.length == 0) {
					return "";
				}

				var val = upicSelect.val();

				if(val in userpicmap) {
					return userpicmap[val];
				}

				return defaultpicurl || "";
			}
		};
	}

	var selectPopup = {
		init: function() {
			this.opened = false;
			this.page = 1;
			this.totalImages = 1;
			this.pager = {
				prev: jQuery(selectNav).children('.i-repost-nav-prev'),
				next: jQuery(selectNav).children('.i-repost-nav-next'),
				counter: jQuery(selectNav).children('.i-repost-nav-counter')
			};
			this.listWrapper = jQuery(selectWindow).children('.b-repost-pics-wrapper');
			this.list = this.listWrapper.children('.b-repost-pics-items');
			this.pagerSize = 4;
			this.pagesNum = 1;
			this.cellWidth = 0;

			this.pager.prev.click(function(){ selectPopup.changePage(-1)});
			this.pager.next.click(function(){ selectPopup.changePage(1)});

			this.firstLi = this.list.children('span:first').click(function() {
					selectPopup.setPicture(noThumb);
			});
		},

		setPicture: function(url) {
			thumb.value = url;
			this.close();
		},

		updatePager: function() {
			selectNav.style.display = (this.totalImages < this.pagerSize)?"none":"block";
			this.pager.prev[(this.page == 1)?"addClass":"removeClass"]('i-repost-nav-prev-dis');
			this.pager.next[(this.page == this.pagesNum)?"addClass":"removeClass"]('i-repost-nav-next-dis');

			this.pager.counter.html(this.page + '/' + this.pagesNum);
		},

		makeListItem: function(url, value, selected) {
			var selClass = (selected)?"b-repost-pics-active":"";

			return jQuery('<span>')
				.addClass(selClass)
				.append ( jQuery('<img>').attr('src', url) )
				.click(function () { selectPopup.setPicture(value) });
		},

		open: function(imgList) {
			this.list.children('span:gt(0)').remove();
			this.totalImages = imgList.length;
			this.page = 1;

			if((imgList.length == 0 || jQuery.inArray(thumb.value, imgList) == -1) && thumb.value != userpicVal && thumb.value != noThumb) {
				thumb.value = "";
			}

			var upicurl = options.getUserPic();
			if(upicurl.length > 0) {
				var userPicImg = upicurl;
				this.makeListItem(userPicImg, userpicVal, userpicVal == thumb.value).appendTo(this.list);
				this.totalImages++;
			}
			this.pagesNum = Math.ceil((this.totalImages + 1) / this.pagerSize);

			if(this.totalImages > 1 && thumb.value == "") {
				thumb.value = imgList[0];
			}

			var selected = "",
				currentPageNum = 1;
			for(var i=0; i < imgList.length; ++i) {
				if( imgList[i] == thumb.value ) {
					currentPageNum = Math.floor( (i + 1 + ((upicurl.length > 0)? 1 : 0)) / this.pagerSize ) + 1;
				}
				this.makeListItem(imgList[i], imgList[i], imgList[i] == thumb.value).appendTo(this.list);
			}

			this.firstLi[((this.totalImages <= 1 && thumb.value == "") || thumb.value == noThumb)?"addClass":"removeClass"]("b-repost-pics-active");

			selectWindow.style.display = 'block';
			this.opened = true;

			this.firstLi.each(function() {
				selectPopup.cellWidth = this.offsetWidth + this.offsetLeft; //calc cell width there because it's not visible on init
			});

			var wrapperWidth = (this.pagerSize > this.totalImages) ? (this.cellWidth * (this.totalImages + 1)) + "px" : "";
			this.listWrapper.css('width', wrapperWidth);
			this.changePage(currentPageNum - 1); // default page is number one, subtracting
		},

		changePage: function(num)
		{
			this.page += num;
			this.page = (this.page < 1)? 1:
						((this.page > this.pagesNum) ? this.pagesNum : this.page);

			var offset =  - this.cellWidth * (this.page - 1) * this.pagerSize;
			this.list.css('left', offset + "px");

			this.updatePager();
		},

		close: function() {
			selectWindow.style.display = 'none';
			this.opened = false;
		}
	}

	selectPopup.init();
	selectWindow.onmousedown = function(event) {
		event = event || window.event;
		if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;
	};

	function extractImageUrls(arr, text)
	{
		jQuery('<div>' + text + "</div>").find("img").each(function() {
				arr.push(this.src);
		});
	}

	function closeSelWindow(ev)
	{
		selectPopup.close();
	}

	select.onmousedown = function(ev) {
		ev = ev || window.event;

		if(!selectPopup.opened) {
			return;
		}

		if (ev.stopPropagation) ev.stopPropagation(); else ev.cancelBubble = true;
	};

	select.onclick = function(ev) {
		ev = ev || window.event;
		var urls = [];

		if(fbInput.getAttribute('disabled') === null || fbInput.getAttribute('disabled') === false) {
			if(selectPopup.opened) {
				closeSelWindow();
			}
			else {
				urls.length=0;
				extractImageUrls(urls, options.getText());
				selectPopup.open(urls);
				setTimeout(function() {	DOM.addEventListener(document, 'mousedown', closeSelWindow, false); }, 0);
			}
		}

		if(ev.preventDefault) {
			ev.preventDefault();
		}
		else {
			ev.returnValue = false;
		}
	}
});
;

/* file-end: js/fb-select-image.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/quickreply.js 
*/

QuickReply = {
	lastDiv: 'qrdiv',
	
	reply: function(dtid, pid, newsubject)
	{
		var targetname = 'ljqrt' + dtid,
			targetcomment = 'ljcmt' + dtid,
			qr_ptid = $('parenttalkid'),
			qr_rto = $('replyto'),
			qr_dtid = $('dtid'),
			qr_div = $('qrdiv'),
			cur_div = $(targetname),
			qr_form_div = $('qrformdiv'),
			qr_form = $('qrform'),
			subject = $('subject');
		
		// Is this a dumb browser?
		if (!qr_ptid || !qr_rto || !qr_dtid || !qr_div || !cur_div || !qr_form || !qr_form_div || !subject) {
			return true;
		}
		
		qr_ptid.value = pid;
		qr_dtid.value = dtid;
		qr_rto.value = pid;
		
		if (QuickReply.lastDiv == 'qrdiv') {
			qr_div.style.display = 'inline';
			// Only one swap
		} else if (QuickReply.lastDiv != dtid) {
		}

		var comments = $('comments'),
			targetcomment = $(targetcomment);

		//LJSUP-11059: when we show old style entry page, comment form should be placed under comment with
		//shift according to its depth.
		if (!comments || comments.className.indexOf('entry-comments-s1') === -1 || !targetcomment) {
			cur_div.parentNode.insertBefore(qr_div, cur_div);
		} else {
			targetcomment.appendChild(qr_div);
		}
		
		QuickReply.lastDiv = targetname;
		
		if (!subject.value || subject.value == subject.defaultValue || subject.value.substr(0, 4) == 'Re: ') {
			subject.value = newsubject;
			subject.defaultValue = newsubject;
		}
		
		qr_form_div.className = cur_div.className || '';
		
		// have to set a timeout because most browsers won't let you focus
		// on an element that's still in the process of being created.
		// so lame.
		window.setTimeout(function(){ qr_form.body.focus() }, 100);
		
		return false;
	},
	
	more: function()
	{
		var qr_form = $('qrform'),
			basepath = $('basepath'),
			dtid = $('dtid'),
			pidform = $('parenttalkid');
		
		// do not do the default form action (post comment) if something is broke
		if (!qr_form || !basepath || !dtid || !pidform) {
			return false;
		}
		
		if(dtid.value > 0 && pidform.value > 0) {
			//a reply to a comment
			qr_form.action = basepath.value + "replyto=" + dtid.value + "#add_comment";
		} else {
			qr_form.action = basepath.value + "mode=reply#add_comment";
		}
		
		// we changed the form action so submit ourselves
		// and don't use the default form action
		qr_form.submit();
		return false;
	},
	
	submit: function()
	{
		var submitmore = $('submitmoreopts'),
			submit = $('submitpost');
		
		if (!submitmore || !submit) {
			return false;
		}
		
		submit.disabled = true;
		submitmore.disabled = true;
		
		// New top-level comments
		var dtid = $('dtid');
		if (!Number(dtid.value)) {
			dtid.value =+ 0;
		}
		
		var qr_form = $('qrform');
		qr_form.action = Site.siteroot + '/talkpost_do.bml';
		qr_form.submit();
		
		// don't do default form action
		return false;
	},
	
	check: function()
	{
		var qr_form = $('qrform');
		if (!qr_form) return true;
		var len = qr_form.body.value.length;
		if (len > 4300) {
			alert('Sorry, but your comment of ' + len + ' characters exceeds the maximum character length of 4300. Please try shortening it and then post again.');
			return false;
		}
		return true;
	},
	
	// Maintain entry through browser navigations.
	save: function()
	{
		var qr_form = $('qrform');
		if (!qr_form) {
			return false;
		}
		var do_spellcheck = $('do_spellcheck'),
			qr_upic = $('prop_picture_keyword');
		
		$('saved_body').value = qr_form.body.value;
		$('saved_subject').value = $('subject').value;
		$('saved_dtid').value = $('dtid').value;
		$('saved_ptid').value = $('parenttalkid').value;
		
		if (do_spellcheck) {
			$('saved_spell').value = do_spellcheck.checked;
		}
		if (qr_upic) { // if it was in the form
			$('saved_upic').value = qr_upic.selectedIndex;
		}
		
		return false;
	},
	
	// Restore saved_entry text across platforms.
	restore: function()
	{
		setTimeout(function(){
			var saved_body = $('saved_body'),
				dtid = $('saved_dtid'),
				subject = $('saved_subject'),
				subject_str = '',
				qr_form = $('qrform');
			if (!saved_body || saved_body.value == '' || !qr_form || !dtid) {
				return;
			}
			
			if (subject) {
				subject_str = subject.value;
			}
			
			QuickReply.reply(dtid.value, parseInt($('saved_ptid').value, 10), subject_str);
			
			qr_form.body.value = saved_body.value;
			
			// if it was in the form
			var upic = $('prop_picture_keyword');
			if (upic) {
				upic.selectedIndex = $('saved_upic').value;
			}
			
			var spellcheck = $('do_spellcheck');
			if (spellcheck) {
				spellcheck.checked = $('saved_spell').value == 'true';
			}
		}, 100);
	},
	
	userpicSelect: function()
	{
		var ups = new UserpicSelect();
		ups.init();
		ups.setPicSelectedCallback(function(picid, keywords)
		{
			var kws_dropdown = $('prop_picture_keyword');
			
			if (kws_dropdown) {
				var items = kws_dropdown.options;
				
				// select the keyword in the dropdown
				keywords.forEach(function(kw)
				{
					for (var i = 0; i < items.length; i++) {
						var item = items[i];
						if (item.value == kw) {
							kws_dropdown.selectedIndex = i;
							return;
						}
					}
				});
			}
		});
		ups.show();
	}
}

jQuery(QuickReply.restore);
DOM.addEventListener(window, 'unload', QuickReply.save);
;

/* file-end: js/quickreply.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/md5.js 
*/

/*
 *  md5.jvs 1.0b 27/06/96
 *
 * Javascript implementation of the RSA Data Security, Inc. MD5
 * Message-Digest Algorithm.
 *
 * Copyright (c) 1996 Henri Torgemane. All Rights Reserved.
 *
 * Permission to use, copy, modify, and distribute this software
 * and its documentation for any purposes and without
 * fee is hereby granted provided that this copyright notice
 * appears in all copies. 
 *
 * Of course, this soft is provided "as is" without express or implied
 * warranty of any kind.
 */



function array(n) {
  for(i=0;i<n;i++) this[i]=0;
  this.length=n;
}

/* Some basic logical functions had to be rewritten because of a bug in
 * Javascript.. Just try to compute 0xffffffff >> 4 with it..
 * Of course, these functions are slower than the original would be, but
 * at least, they work!
 */

function integer(n) { return n%(0xffffffff+1); }

function shr(a,b) {
  a=integer(a);
  b=integer(b);
  if (a-0x80000000>=0) {
    a=a%0x80000000;
    a>>=b;
    a+=0x40000000>>(b-1);
  } else
    a>>=b;
  return a;
}

function shl1(a) {
  a=a%0x80000000;
  if (a&0x40000000==0x40000000)
  {
    a-=0x40000000;  
    a*=2;
    a+=0x80000000;
  } else
    a*=2;
  return a;
}

function shl(a,b) {
  a=integer(a);
  b=integer(b);
  for (var i=0;i<b;i++) a=shl1(a);
  return a;
}

function and(a,b) {
  a=integer(a);
  b=integer(b);
  var t1=(a-0x80000000);
  var t2=(b-0x80000000);
  if (t1>=0) 
    if (t2>=0) 
      return ((t1&t2)+0x80000000);
    else
      return (t1&b);
  else
    if (t2>=0)
      return (a&t2);
    else
      return (a&b);  
}

function or(a,b) {
  a=integer(a);
  b=integer(b);
  var t1=(a-0x80000000);
  var t2=(b-0x80000000);
  if (t1>=0) 
    if (t2>=0) 
      return ((t1|t2)+0x80000000);
    else
      return ((t1|b)+0x80000000);
  else
    if (t2>=0)
      return ((a|t2)+0x80000000);
    else
      return (a|b);  
}

function xor(a,b) {
  a=integer(a);
  b=integer(b);
  var t1=(a-0x80000000);
  var t2=(b-0x80000000);
  if (t1>=0) 
    if (t2>=0) 
      return (t1^t2);
    else
      return ((t1^b)+0x80000000);
  else
    if (t2>=0)
      return ((a^t2)+0x80000000);
    else
      return (a^b);  
}

function not(a) {
  a=integer(a);
  return (0xffffffff-a);
}

/* Here begin the real algorithm */

    var state = new array(4); 
    var count = new array(2);
	count[0] = 0;
	count[1] = 0;                     
    var buffer = new array(64); 
    var transformBuffer = new array(16); 
    var digestBits = new array(16);

    var S11 = 7;
    var S12 = 12;
    var S13 = 17;
    var S14 = 22;
    var S21 = 5;
    var S22 = 9;
    var S23 = 14;
    var S24 = 20;
    var S31 = 4;
    var S32 = 11;
    var S33 = 16;
    var S34 = 23;
    var S41 = 6;
    var S42 = 10;
    var S43 = 15;
    var S44 = 21;

    function F(x,y,z) {
	return or(and(x,y),and(not(x),z));
    }

    function G(x,y,z) {
	return or(and(x,z),and(y,not(z)));
    }

    function H(x,y,z) {
	return xor(xor(x,y),z);
    }

    function I(x,y,z) {
	return xor(y ,or(x , not(z)));
    }

    function rotateLeft(a,n) {
	return or(shl(a, n),(shr(a,(32 - n))));
    }

    function FF(a,b,c,d,x,s,ac) {
        a = a+F(b, c, d) + x + ac;
	a = rotateLeft(a, s);
	a = a+b;
	return a;
    }

    function GG(a,b,c,d,x,s,ac) {
	a = a+G(b, c, d) +x + ac;
	a = rotateLeft(a, s);
	a = a+b;
	return a;
    }

    function HH(a,b,c,d,x,s,ac) {
	a = a+H(b, c, d) + x + ac;
	a = rotateLeft(a, s);
	a = a+b;
	return a;
    }

    function II(a,b,c,d,x,s,ac) {
	a = a+I(b, c, d) + x + ac;
	a = rotateLeft(a, s);
	a = a+b;
	return a;
    }

    function transform(buf,offset) { 
	var a=0, b=0, c=0, d=0; 
	var x = transformBuffer;
	
	a = state[0];
	b = state[1];
	c = state[2];
	d = state[3];
	
	for (i = 0; i < 16; i++) {
	    x[i] = and(buf[i*4+offset],0xff);
	    for (j = 1; j < 4; j++) {
		x[i]+=shl(and(buf[i*4+j+offset] ,0xff), j * 8);
	    }
	}

	/* Round 1 */
	a = FF ( a, b, c, d, x[ 0], S11, 0xd76aa478); /* 1 */
	d = FF ( d, a, b, c, x[ 1], S12, 0xe8c7b756); /* 2 */
	c = FF ( c, d, a, b, x[ 2], S13, 0x242070db); /* 3 */
	b = FF ( b, c, d, a, x[ 3], S14, 0xc1bdceee); /* 4 */
	a = FF ( a, b, c, d, x[ 4], S11, 0xf57c0faf); /* 5 */
	d = FF ( d, a, b, c, x[ 5], S12, 0x4787c62a); /* 6 */
	c = FF ( c, d, a, b, x[ 6], S13, 0xa8304613); /* 7 */
	b = FF ( b, c, d, a, x[ 7], S14, 0xfd469501); /* 8 */
	a = FF ( a, b, c, d, x[ 8], S11, 0x698098d8); /* 9 */
	d = FF ( d, a, b, c, x[ 9], S12, 0x8b44f7af); /* 10 */
	c = FF ( c, d, a, b, x[10], S13, 0xffff5bb1); /* 11 */
	b = FF ( b, c, d, a, x[11], S14, 0x895cd7be); /* 12 */
	a = FF ( a, b, c, d, x[12], S11, 0x6b901122); /* 13 */
	d = FF ( d, a, b, c, x[13], S12, 0xfd987193); /* 14 */
	c = FF ( c, d, a, b, x[14], S13, 0xa679438e); /* 15 */
	b = FF ( b, c, d, a, x[15], S14, 0x49b40821); /* 16 */

	/* Round 2 */
	a = GG ( a, b, c, d, x[ 1], S21, 0xf61e2562); /* 17 */
	d = GG ( d, a, b, c, x[ 6], S22, 0xc040b340); /* 18 */
	c = GG ( c, d, a, b, x[11], S23, 0x265e5a51); /* 19 */
	b = GG ( b, c, d, a, x[ 0], S24, 0xe9b6c7aa); /* 20 */
	a = GG ( a, b, c, d, x[ 5], S21, 0xd62f105d); /* 21 */
	d = GG ( d, a, b, c, x[10], S22,  0x2441453); /* 22 */
	c = GG ( c, d, a, b, x[15], S23, 0xd8a1e681); /* 23 */
	b = GG ( b, c, d, a, x[ 4], S24, 0xe7d3fbc8); /* 24 */
	a = GG ( a, b, c, d, x[ 9], S21, 0x21e1cde6); /* 25 */
	d = GG ( d, a, b, c, x[14], S22, 0xc33707d6); /* 26 */
	c = GG ( c, d, a, b, x[ 3], S23, 0xf4d50d87); /* 27 */
	b = GG ( b, c, d, a, x[ 8], S24, 0x455a14ed); /* 28 */
	a = GG ( a, b, c, d, x[13], S21, 0xa9e3e905); /* 29 */
	d = GG ( d, a, b, c, x[ 2], S22, 0xfcefa3f8); /* 30 */
	c = GG ( c, d, a, b, x[ 7], S23, 0x676f02d9); /* 31 */
	b = GG ( b, c, d, a, x[12], S24, 0x8d2a4c8a); /* 32 */

	/* Round 3 */
	a = HH ( a, b, c, d, x[ 5], S31, 0xfffa3942); /* 33 */
	d = HH ( d, a, b, c, x[ 8], S32, 0x8771f681); /* 34 */
	c = HH ( c, d, a, b, x[11], S33, 0x6d9d6122); /* 35 */
	b = HH ( b, c, d, a, x[14], S34, 0xfde5380c); /* 36 */
	a = HH ( a, b, c, d, x[ 1], S31, 0xa4beea44); /* 37 */
	d = HH ( d, a, b, c, x[ 4], S32, 0x4bdecfa9); /* 38 */
	c = HH ( c, d, a, b, x[ 7], S33, 0xf6bb4b60); /* 39 */
	b = HH ( b, c, d, a, x[10], S34, 0xbebfbc70); /* 40 */
	a = HH ( a, b, c, d, x[13], S31, 0x289b7ec6); /* 41 */
	d = HH ( d, a, b, c, x[ 0], S32, 0xeaa127fa); /* 42 */
	c = HH ( c, d, a, b, x[ 3], S33, 0xd4ef3085); /* 43 */
	b = HH ( b, c, d, a, x[ 6], S34,  0x4881d05); /* 44 */
	a = HH ( a, b, c, d, x[ 9], S31, 0xd9d4d039); /* 45 */
	d = HH ( d, a, b, c, x[12], S32, 0xe6db99e5); /* 46 */
	c = HH ( c, d, a, b, x[15], S33, 0x1fa27cf8); /* 47 */
	b = HH ( b, c, d, a, x[ 2], S34, 0xc4ac5665); /* 48 */

	/* Round 4 */
	a = II ( a, b, c, d, x[ 0], S41, 0xf4292244); /* 49 */
	d = II ( d, a, b, c, x[ 7], S42, 0x432aff97); /* 50 */
	c = II ( c, d, a, b, x[14], S43, 0xab9423a7); /* 51 */
	b = II ( b, c, d, a, x[ 5], S44, 0xfc93a039); /* 52 */
	a = II ( a, b, c, d, x[12], S41, 0x655b59c3); /* 53 */
	d = II ( d, a, b, c, x[ 3], S42, 0x8f0ccc92); /* 54 */
	c = II ( c, d, a, b, x[10], S43, 0xffeff47d); /* 55 */
	b = II ( b, c, d, a, x[ 1], S44, 0x85845dd1); /* 56 */
	a = II ( a, b, c, d, x[ 8], S41, 0x6fa87e4f); /* 57 */
	d = II ( d, a, b, c, x[15], S42, 0xfe2ce6e0); /* 58 */
	c = II ( c, d, a, b, x[ 6], S43, 0xa3014314); /* 59 */
	b = II ( b, c, d, a, x[13], S44, 0x4e0811a1); /* 60 */
	a = II ( a, b, c, d, x[ 4], S41, 0xf7537e82); /* 61 */
	d = II ( d, a, b, c, x[11], S42, 0xbd3af235); /* 62 */
	c = II ( c, d, a, b, x[ 2], S43, 0x2ad7d2bb); /* 63 */
	b = II ( b, c, d, a, x[ 9], S44, 0xeb86d391); /* 64 */

	state[0] +=a;
	state[1] +=b;
	state[2] +=c;
	state[3] +=d;

    }

    function init() {
	count[0]=count[1] = 0;
	state[0] = 0x67452301;
	state[1] = 0xefcdab89;
	state[2] = 0x98badcfe;
	state[3] = 0x10325476;
	for (i = 0; i < digestBits.length; i++)
	    digestBits[i] = 0;
    }

    function update(b) { 
	var index,i;
	
	index = and(shr(count[0],3) , 0x3f);
	if (count[0]<0xffffffff-7) 
	  count[0] += 8;
        else {
	  count[1]++;
	  count[0]-=0xffffffff+1;
          count[0]+=8;
        }
	buffer[index] = and(b,0xff);
	if (index  >= 63) {
	    transform(buffer, 0);
	}
    }

    function finish() {
	var bits = new array(8);
	var	padding; 
	var	i=0, index=0, padLen=0;

	for (i = 0; i < 4; i++) {
	    bits[i] = and(shr(count[0],(i * 8)), 0xff);
	}
        for (i = 0; i < 4; i++) {
	    bits[i+4]=and(shr(count[1],(i * 8)), 0xff);
	}
	index = and(shr(count[0], 3) ,0x3f);
	padLen = (index < 56) ? (56 - index) : (120 - index);
	padding = new array(64); 
	padding[0] = 0x80;
        for (i=0;i<padLen;i++)
	  update(padding[i]);
        for (i=0;i<8;i++) 
	  update(bits[i]);

	for (i = 0; i < 4; i++) {
	    for (j = 0; j < 4; j++) {
		digestBits[i*4+j] = and(shr(state[i], (j * 8)) , 0xff);
	    }
	} 
    }

/* End of the MD5 algorithm */

function hexa(n) {
 var hexa_h = "0123456789abcdef";
 var hexa_c=""; 
 var hexa_m=n;
 for (hexa_i=0;hexa_i<8;hexa_i++) {
   hexa_c=hexa_h.charAt(Math.abs(hexa_m)%16)+hexa_c;
   hexa_m=Math.floor(hexa_m/16);
 }
 return hexa_c;
}


var ascii="01234567890123456789012345678901" +
          " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
          "[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

function MD5(entree) 
{
 var l,s,k,ka,kb,kc,kd;

 init();
 for (k=0;k<entree.length;k++) {
   l=entree.charAt(k);
   update(ascii.lastIndexOf(l));
 }
 finish();
 ka=kb=kc=kd=0;
 for (i=0;i<4;i++) ka+=shl(digestBits[15-i], (i*8));
 for (i=4;i<8;i++) kb+=shl(digestBits[15-i], ((i-4)*8));
 for (i=8;i<12;i++) kc+=shl(digestBits[15-i], ((i-8)*8));
 for (i=12;i<16;i++) kd+=shl(digestBits[15-i], ((i-12)*8));
 s=hexa(kd)+hexa(kc)+hexa(kb)+hexa(ka);
 return s; 
}

/* This implement the MD5 test suite */
var testOk=false;
function teste() {
 if (testOk) return;
 document.test.o1.value=MD5(document.test.i1.value);
 document.test.o2.value=MD5(document.test.i2.value);
 document.test.o3.value=MD5(document.test.i3.value);
 document.test.o4.value=MD5(document.test.i4.value);
 document.test.o5.value=MD5(document.test.i5.value);
 document.test.o6.value=MD5(document.test.i6.value);
 document.test.o7.value=MD5(document.test.i7.value);
 testOk=true;
}
;

/* file-end: js/md5.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/thread_expander.js 
*/

Expander = function(){
    this.__caller__;    // <a> HTML element from where Expander was called
    this.url;           // full url of thread to be expanded
    this.id;            // id of the thread
    this.stored_caller;
    this.iframe;        // iframe, where the thread will be loaded
    this.is_S1;         // bool flag, true == journal is in S1, false == in S2
}
Expander.Collection={};
Expander.make = function(el,url,id,is_S1){
    var local = (new Expander).set({__caller__:el,url:url.replace(/#.*$/,''),id:id,is_S1:!!is_S1});
    local.get();
}

Expander.prototype.set = function(options){
    for(var opt in options){
        this[opt] = options[opt];
    }
    return this;
}

Expander.prototype.getCanvas = function(id,context){
    return context.document.getElementById('ljcmt'+id);
}

Expander.prototype.parseLJ_cmtinfo = function(context,callback){
    var map={}, node, j;
    var LJ = context.LJ_cmtinfo;
    if(!LJ)return false;
    for(j in LJ){
        if(/^\d*$/.test(j) && (node = this.getCanvas(j,context))){
            map[j] = {info:LJ[j],canvas:node};
            if(typeof callback == 'function'){
                callback(j,map[j]);
            }
        }
    }
    return map;
}

Expander.prototype.loadingStateOn = function(){
    this.stored_caller = this.__caller__.cloneNode(true);
    this.__caller__.setAttribute('already_clicked','already_clicked');
    this.__caller__.onclick = function(){return false}
    this.__caller__.style.color = '#ccc';
}

Expander.prototype.loadingStateOff = function(){
    if(this.__caller__){
        // actually, the <a> element is removed from main window by
        // copying comment from ifame, so this code is not executed (?)
        this.__caller__.removeAttribute('already_clicked','already_clicked');
        if(this.__caller__.parentNode) this.__caller__.parentNode.replaceChild(this.stored_caller,this.__caller__);
    }
    var obj = this;
    // When frame is removed immediately, IE raises an error sometimes
    window.setTimeout(function(){obj.killFrame()},100);
}

Expander.prototype.killFrame = function(){
    document.body.removeChild(this.iframe);
}

Expander.prototype.isFullComment = function(comment){
    return !!Number(comment.info.full);
}

Expander.prototype.killDuplicate = function(comments){
    var comment;
    var id,id_,el,el_;
    for(var j in comments){
        if(!/^\d*$/.test(j))continue;
        el_ = comments[j].canvas;
        id_ = el_.id;
        id = id_.replace(/_$/,'');
        el = document.getElementById(id);
        if(el!=null){
            //in case we have a duplicate;
            el_.parentNode.removeChild(el_);
        }else{
            el_.id = id;
            window.ContextualPopup && ContextualPopup.searchAndAdd(el_);
            window.setupAjax && setupAjax(el_);
            window.ESN && ESN.initTrackBtns(el_);
        }
    }
}

Expander.prototype.getS1width = function(canvas){
  //TODO:  may be we should should add somie ID to the spacer img instead of searching it
  //yet, this works until we have not changed the spacers url = 'dot.gif?v=557');
  var img, imgs;
  imgs = canvas.getElementsByTagName('img');
  for(var j=0;j<imgs.length;j++){
    img=imgs[j];
    if(/dot\.gif$/.test(img.src)){
        if (img.width) { return Number(img.width); }
        break;
    }
  }
  return false;
}

Expander.prototype.setS1width = function(canvas,w){
  var img, imgs;
  imgs = canvas.getElementsByTagName('img');
  for(var j=0;j<imgs.length;j++){
    img=imgs[j];
    if(/dot\.gif$/.test(img.src)){
        img.setAttribute('width',w);
        break;
    }
  }
}

Expander.prototype.onLoadHandler = function(iframe){
        var doc = iframe.contentDocument || iframe.contentWindow;
        doc = doc.document||doc;
        var obj = this;
        var win = doc.defaultView||doc.parentWindow;
        var comments_intersection={};
        var comments_page = this.parseLJ_cmtinfo(window);
        var comments_iframe = this.parseLJ_cmtinfo(win,function(id,new_comment){
                                    if(id in comments_page){
                                        comments_page[id].canvas.id = comments_page[id].canvas.id+'_';
                                        comments_intersection[id] = comments_page[id];
                                        // copy comment from iframe to main window if
                                        // 1) the comment is collapsed in main window and is full in iframe
                                        // 2) or this is the root comment of this thread (it may be full in
                                        //     main window too, it's copied so that to remove "expand" link from it)
                                        if((!obj.isFullComment(comments_page[id]) && obj.isFullComment(new_comment)) || (id===obj.id)){
                                            var w;
                                            if(obj.is_S1){
                                                w =obj.getS1width(comments_page[id].canvas);
                                            }
                                            comments_page[id].canvas.innerHTML = new_comment.canvas.innerHTML;
                                            if(obj.is_S1 && w!==false){
                                                    obj.setS1width(comments_page[id].canvas,w);
                                            }
                                            //TODO: may be this should be uncommented
                                            //comments_page[id].canvas.className = new_comment.canvas.className;
                                            LJ_cmtinfo[id].full=1;
                                            LJ_cmtinfo[id].expanded=1;
                                        }
                                    }//if(id in comments_page){
                                });
       this.killDuplicate(comments_intersection);
       this.loadingStateOff();
       return true;
}


//just for debugging
Expander.prototype.toString = function(){
    return '__'+this.id+'__';
}


Expander.prototype.get = function(){
    if(this.__caller__.getAttribute('already_clicked')){
        return false;
    }
    this.loadingStateOn();

    var iframe;
    if(/*@cc_on !@*/0){
        // branch for IE
        Expander.Collection[this.id] = this;
        iframe = document.createElement('<iframe onload="Expander.Collection['+this.id+'].onLoadHandler(this)">');
    }else{
        // branch for all other browsers
        iframe = document.createElement('iframe');
        iframe.onload = function(obj){return function(){
                            obj.onLoadHandler(iframe);
                        }}(this);
    }
    iframe.style.height='1px';
    iframe.style.width='1px';
    iframe.style.display = 'none';
    iframe.src = this.url;
    iframe.id = this.id;
    document.body.appendChild(iframe);
    this.iframe=iframe;
    return true;
};
;

/* file-end: js/thread_expander.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/thread_expander.ex.js 
*/

/*
 * ExpanderEx object is used in s1 style comment pages and provides
 * ajax functionality to expand comments instead of loading iframe page as it is
 * in old Expander
 * expander object is also used in commentmanage.js
 */
ExpanderEx = function(){
    this.__caller__;    // <a> HTML element from where ExpanderEx was called
    this.url;           // full url of thread to be expanded
    this.id;            // id of the thread
    this.stored_caller;
    this.is_S1;         // bool flag, true == journal is in S1, false == in S2
}
ExpanderEx.Collection={};
ExpanderEx.ReqCache = {};

ExpanderEx.make = function(ev,el,url,id,is_S1){
    var local = (new ExpanderEx).set({__caller__:el,url:url.replace(/#.*$/,''),id:id,is_S1:!!is_S1});
    local.get();
    jQuery.event.fix(ev).preventDefault();
}

ExpanderEx.collapse = function(ev,el,url,id,is_S1){
    var local = (new ExpanderEx).set({__caller__:el,url:url.replace(/#.*$/,''),id:id,is_S1:!!is_S1});
    local.collapseThread();
    jQuery.event.fix(ev).preventDefault();
}

ExpanderEx.prototype.set = function(options){
    for(var opt in options){
        this[opt] = options[opt];
    }
    return this;
}

ExpanderEx.prototype.getCanvas = function(id,context){
    return context.document.getElementById('ljcmt'+id);
}

ExpanderEx.prototype.parseLJ_cmtinfo = function(context,callback){
    var map={}, node, j;
    var LJ = context.LJ_cmtinfo;
    if(!LJ)return false;
    for(j in LJ){
        if(/^\d*$/.test(j) && (node = this.getCanvas(j,context))){
            map[j] = {info:LJ[j],canvas:node};
            if(typeof callback == 'function'){
                callback(j,map[j]);
            }
        }
    }
    return map;
}

ExpanderEx.preloadImg = function(){
    (new Image()).src = Site.imgprefix + '/preloader-s.gif?v=9673';
}

ExpanderEx.prototype.addPreloader = function(){
    this.loader = new Image();
    this.loader.src = Site.imgprefix + '/preloader-s.gif?v=9673';
    this.loader.className = 'i-exp-preloader';
    this.__caller__.parentNode.appendChild( this.loader );
}

ExpanderEx.prototype.removePreloader = function(){
    if( !this.loader ){
        return;
    }

    if( this.loader.parentNode ){
        this.loader.parentNode.removeChild( this.loader );
    }
    delete this.loader;
};

ExpanderEx.prototype.loadingStateOn = function(){
    // turn on preloader there
    this.addPreloader();
    this.stored_caller = this.__caller__.cloneNode(true);
    this.__caller__.setAttribute('already_clicked','already_clicked');
    this.__caller__.onclick = function(){return false}
    this.__caller__.style.color = '#ccc';
}

ExpanderEx.prototype.loadingStateOff = function(){
    if(this.__caller__){
        // actually, the <a> element is removed from main window by
        // copying comment from ifame, so this code is not executed (?)
        this.__caller__.removeAttribute('already_clicked','already_clicked');
        if(this.__caller__.parentNode) this.__caller__.parentNode.replaceChild(this.stored_caller,this.__caller__);
        //remove preloader if exist
        this.removePreloader();
    }
    var obj = this;
    // When frame is removed immediately, IE raises an error sometimes
}

ExpanderEx.prototype.killFrame = function(){
    document.body.removeChild(this.iframe);
}

ExpanderEx.prototype.isFullComment = function( comment ) {
    return !!Number(comment.info.full);
}

ExpanderEx.prototype.expandThread = function( json ) {
    this.loadingStateOff();

    //we show expand link if comment block has collapsed children
    function isChildCollapsed( idx )
    {
        var state;
        for( var i = idx + 1; i < json.length; ++i ) {
            state = json[ i ].state;
            if( state === "expanded" ) { return false; }
            if( state === "collapsed" ) { return true; }
        }

        return  false;
    }

    var threadId, cell, html;
    for( var i = 0; i < json.length; ++i ) {
        //we skip comment blocks thate were not expanded
        if( json[ i ].state === 'deleted' ) {
            LJ_cmtinfo[ json[ i ].thread ].is_deleted = true;
        }
		if( !( json[ i ].thread in LJ_cmtinfo ) ) {
			continue;
		}
        if( json[ i ].state && json[ i ].state !== "expanded") {
            continue;
        }

        threadId = json[ i ].thread;
        html = ExpanderEx.prepareCommentBlock( jQuery( json[ i ].html ), threadId, isChildCollapsed( i ) );

        var oldHtml = LiveJournal.CommentManager.updateCell( threadId, html );
        if( !( threadId in ExpanderEx.Collection ) ) {
            ExpanderEx.Collection[ threadId ] = oldHtml;
        }
    }

    //duplicate cycle, because we do not know, that external scripts do with node
    for( var i = 0; i < json.length; ++i ) {
        threadId = json[ i ].thread;
        LJ_cmtinfo[ threadId ].parent = this.id;
        if( json[ i ].state && json[ i ].state === "expanded") {
            this.initCommentBlock( jQuery( '#ljcmt' + threadId )[0] , threadId );
        }
    }

    return true;
}

ExpanderEx.prototype.collapseThread = function( id ){
    var threadId = id || this.id;
    this.collapseBlock( threadId );

    var children = LJ_cmtinfo[ threadId ].rc;
    for( var i = 0; i < children.length; ++i )
        this.collapseThread( children[ i ] );
}

ExpanderEx.prototype.collapseBlock =  function( id )
{
	if( id in ExpanderEx.Collection ) {
		LiveJournal.CommentManager.updateCell( id, ExpanderEx.Collection[ id ] );

		this.initCommentBlock( LiveJournal.CommentManager.getCell( id )[0], id, true );
		delete ExpanderEx.Collection[ id ];
	}
}

ExpanderEx.prototype.initCommentBlock = function( el_, id, restoreInitState )
{
    if( !restoreInitState ){
        LJ_cmtinfo[ id ].oldvars = {
            full: LJ_cmtinfo[ id ].full || 0,
            expanded: LJ_cmtinfo[ id ].expanded || 0
        }
        LJ_cmtinfo[ id ].full = 1;
        LJ_cmtinfo[ id ].expanded = 1;
    }
    else {
        LJ_cmtinfo[ id ].full = LJ_cmtinfo[ id ].oldvars.full;
        LJ_cmtinfo[ id ].expanded = LJ_cmtinfo[ id ].oldvars.expanded;
        delete LJ_cmtinfo[ id ].oldvars;
    }
    window.ContextualPopup && ContextualPopup.searchAndAdd(el_);
    //window.setupAjax && setupAjax(el_, true);
    window.ESN && ESN.initTrackBtns(el_);
}


//just for debugging
ExpanderEx.prototype.toString = function(){
    return '__'+this.id+'__';
}


ExpanderEx.prototype.get = function(){
    if(this.__caller__.getAttribute('already_clicked')){
        return false;
    }
    this.loadingStateOn();

    var obj = this;
    //set timeout to allow browser to display image before request
    setTimeout( function(){
        LiveJournal.CommentManager.getThreadJSON( obj.id, function(result) {
            obj.expandThread(result);
            ExpanderEx.ReqCache[ obj.id ] = result;
        }, false, false, true );
    }, 0 );

    return true;
}

//toggle visibility of expand and collapse links, if server returns
//html with both of them ( with every ajax request)
ExpanderEx.prepareCommentBlock = function(html, id, showExpand){
    this.showExpandLink( id, html, showExpand );
    return html;
}

ExpanderEx.showExpandLink = function ( id, block, showExpand ) {
    var expandSel = "#expand_" + id,
        collapseSel = "#collapse_" + id,
        selector, resetSelector;

    if( LJ_cmtinfo[ id ].has_link > 0 ) {
        if( showExpand ) {
            selector = collapseSel;
            resetSelector = expandSel;
        } else {
            selector = expandSel;
            resetSelector = collapseSel;
        }
        block.find( resetSelector ).css( 'display', '' );
    }
    else {
        selector = collapseSel + "," + expandSel;
    }

    block.find( selector )
        .css( 'display', 'none' );
}

ExpanderEx.preloadImg();
;

/* file-end: js/thread_expander.ex.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/commentmanage.js 
*/

// called by S2:
function setStyle (did, attr, val) {
    if (! document.getElementById) return;
    var de = document.getElementById(did);
    if (! de) return;
    if (de.style)
        de.style[attr] = val
}

// called by S2:
function setInner (did, val) {
    if (! document.getElementById) return;
    var de = document.getElementById(did);
    if (! de) return;
    de.innerHTML = val;
}

// called by S2:
function hideElement (did) {
    if (! document.getElementById) return;
    var de = document.getElementById(did);
    if (! de) return;
    de.style.display = 'none';
}

// called by S2:
function setAttr (did, attr, classname) {
    if (! document.getElementById) return;
    var de = document.getElementById(did);
    if (! de) return;
    de.setAttribute(attr, classname);
}

// called from Page:
function multiformSubmit (form, txt) {
    var sel_val = form.mode.value;
    if (!sel_val) {
        alert(txt.no_action);
        return false;
    }

    if (sel_val.substring(0, 4) == 'all:') { // mass action
        return;
    }

    var i = -1, has_selected = false; // at least one checkbox
    while (form[++i]) {
        if (form[i].name.substring(0, 9) == 'selected_' && form[i].checked) {
            has_selected = true;
            break;
        }
    }
    if (!has_selected) {
        alert(txt.no_comments);
        return false;
    }

    if (sel_val == 'delete' || sel_val == 'deletespam') {
        return confirm(txt.conf_delete);
    }
}

function getLocalizedStr( key, username ) {
    return LiveJournal.getLocalizedStr( key, { username: username } );
}

// hsv to rgb
// h, s, v = [0, 1), [0, 1], [0, 1]
// r, g, b = [0, 255], [0, 255], [0, 255]
function hsv_to_rgb (h, s, v)
{
    if (s == 0) {
	v *= 255;
	return [v,v,v];
    }

    h *= 6;
    var i = Math.floor(h);
    var f = h - i;
    var p = v * (1 - s);
    var q = v * (1 - s * f);
    var t = v * (1 - s * (1 - f));

    v = Math.floor(v * 255 + 0.5);
    t = Math.floor(t * 255 + 0.5);
    p = Math.floor(p * 255 + 0.5);
    q = Math.floor(q * 255 + 0.5);

    if (i == 0) return [v,t,p];
    if (i == 1) return [q,v,p];
    if (i == 2) return [p,v,t];
    if (i == 3) return [p,q,v];
    if (i == 4) return [t,p,v];
    return [v,p,q];
}

function deleteComment (ditemid, action) {
	action = action || 'delete';
	
	var curJournal = (Site.currentJournal !== "") ? (Site.currentJournal) : (LJ_cmtinfo.journal);

    var form = $('ljdelopts' + ditemid),
        todel = $('ljcmt' + ditemid),
        opt_delthread, opt_delauthor, is_deleted, is_error,
        pulse = 0,
		url = LiveJournal.getAjaxUrl('delcomment')+'?mode=js&journal=' + curJournal + '&id=' + ditemid;
    
	var postdata = 'confirm=1';
    if (form && action == 'delete') { 
    	if (form.ban && form.ban.checked) {
			postdata += '&ban=1';
		}
    	if (form.spam && form.spam.checked) {
			postdata += '&spam=1';
		}
    	if (form.delthread && form.delthread.checked) {
			postdata += '&delthread=1';
			opt_delthread = true;
		}
    	if (form.delauthor && form.delauthor.checked) {
        	postdata += '&delauthor=1';
        	opt_delauthor = true;
    	}
    } else if (action == 'markAsSpam') {
		opt_delauthor = opt_delthread = true;
		postdata += '&ban=1&spam=1&delauthor=1';
	}
	
    postdata += '&lj_form_auth=' + decodeURIComponent(LJ_cmtinfo.form_auth);

    var opts = {
        url: url,
        data: postdata,
        method: 'POST',
        onData: function(data) {
            is_deleted = !!data;
            is_error = !is_deleted;
        },
        onError: function() {
          alert('Error deleting ' + ditemid);
          is_error = true;
        }
    };

	HTTPReq.getJSON(opts);


    var flash = function () {
        var rgb = hsv_to_rgb(0, Math.cos((pulse + 1) / 2), 1);
        pulse += 3.14159 / 5;
        var color = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";

        todel.style.border = "2px solid " + color;
        if (is_error) {
            todel.style.border = "";
            // and let timer expire
        } else if (is_deleted) {
			removeComment(ditemid, opt_delthread);
            if (opt_delauthor && LJ_cmtinfo[ditemid].u !== '') {
                for (var item in LJ_cmtinfo) {
					if ( LJ_cmtinfo[item].u == LJ_cmtinfo[ditemid].u
						&& !LJ_cmtinfo[ item ].is_deleted) {
						removeComment(item, false);
                    }
                }
            }
        } else {
            window.setTimeout(flash, 50);
        }
    };

    window.setTimeout(flash, 5);
}

function removeComment (ditemid, killChildren) {
	if( LiveJournal.CommentManager.getState() !== 'iframe'){
		var threadId = ditemid;

		LiveJournal.CommentManager.getThreadJSON(threadId, function(result) {
			LiveJournal.CommentManager.processThreadJSON( result, function( dtid, html, comment) {
				if (LJ_cmtinfo[ threadId ].u !== LJ_cmtinfo[ dtid ].u) {
					return;
				}

				html = ExpanderEx.prepareCommentBlock( html, dtid ); //, isChildCollapsed( i ) );
				LiveJournal.CommentManager.updateCell( dtid, html );
				if( comment.is_deleted && ( dtid in ExpanderEx.Collection ) ) {
					delete ExpanderEx.Collection[ dtid ];
				}
			} );
		}, true );
	}
	else {
		var todel = document.getElementById("ljcmt" + ditemid);
		if (todel) {
			todel.style.display = 'none';

			var userhook = window["userhook_delete_comment_ARG"];
			if (userhook)
				userhook(ditemid);
		}
	}
	if (killChildren) {
		var com = LJ_cmtinfo[ditemid];
		for (var i = 0; i < com.rc.length; i++) {
			removeComment(com.rc[i], true);
		}
	}
}

function createDeleteFunction(ae, dItemid, action) {
	action = action || 'delete';
	
    return function (e) {
		e = jQuery.event.fix(e || window.event);
		
		e.stopPropagation();
		e.preventDefault();

        var doIT = 0;
        // immediately delete on shift key
        if (e.shiftKey) {
			doIT = 1;
			deleteComment(dItemid, action);
			return true;
		}
		
		if (!LJ_cmtinfo) {
			return true;
		}

        var com = LJ_cmtinfo[dItemid],
			comUser = LJ_cmtinfo[dItemid].u,
			remoteUser = LJ_cmtinfo.remote;
        if (!com || !remoteUser) {
			return true;
		}
        var canAdmin = LJ_cmtinfo.canAdmin;
		
		var markSpamMLPrefix = (Site.remote_is_maintainer == 1 && com.u !== '') ? 'comment.mark.spam.' : 'comment.mark.spam2.';		
		
		if (action == 'markAsSpam') {
			if (!window.ctrlPopup) {
				window.ctrlPopup = jQuery('<div class="b-popup-ctrlcomm" />')
					.delegate('input.spam-comment-button', 'click', function () {
						window.ctrlPopup.bubble('hide');
					});
			}			

			window.ctrlPopup
				.html('<div class="b-popup-group"><div class="b-popup-row b-popup-row-head"><strong>' + getLocalizedStr(markSpamMLPrefix + 'title', comUser) + '</strong></div><div class="b-popup-row">' + getLocalizedStr(markSpamMLPrefix + 'subject', comUser) + '</div><div class="b-popup-row"><input type="button" class="spam-comment-button" onclick="deleteComment(' + dItemid + ', \'' + action + '\');" value="' + getLocalizedStr(markSpamMLPrefix + 'button', comUser) + '"></div><div>', ae, e, 'spamComment' + dItemid)
				.bubble()
				.bubble('show', ae);

			return true;
		} else if (action == 'delete') {
			var inHTML = [ "<form id='ljdelopts" + dItemid + "'><div class='b-popup-group'><div class='b-popup-row b-popup-row-head'><strong>" + getLocalizedStr( 'comment.delete.q', comUser ) + "</strong></div>" ];
			var lbl;
			if (com.username !== "" && com.username != remoteUser && canAdmin) {
				lbl = "ljpopdel" + dItemid + "ban";
				inHTML.push("<div class='b-popup-row'><input type='checkbox' name='ban' id='" + lbl + "'> <label for='" + lbl + "'>" + getLocalizedStr( 'comment.ban.user', comUser ) + "</label></div>");
			}

			if (com.rc && com.rc.length && canAdmin) {
				lbl = "ljpopdel" + dItemid + "thread";
				inHTML.push("<div class='b-popup-row'><input type='checkbox' name='delthread' id='" + lbl + "'> <label for='" + lbl + "'>" + getLocalizedStr( 'comment.delete.all.sub', comUser ) + "</label></div>");
			}
			if (canAdmin&&com.username) {
				lbl = "ljpopdel" + dItemid + "author";
				inHTML.push("<div class='b-popup-row'><input type='checkbox' name='delauthor' id='" + lbl + "'> <label for='" + lbl + "'>" +
						(com.username == remoteUser ? getLocalizedStr( 'comment.delete.all.my') :
						getLocalizedStr( 'comment.delete.all', "<b>" + comUser + "</b>" )) + "</label></div>");
			}

			inHTML.push("<div class='b-popup-row'><input class='delete-comment-button' type='button' value='" + getLocalizedStr( 'comment.delete', comUser ) + "' onclick='deleteComment(" + dItemid + ");' /></div></div><div class='b-bubble b-bubble-alert b-bubble-noarrow'><i class='i-bubble-arrow-border'></i><i class='i-bubble-arrow'></i>" + getLocalizedStr( 'comment.delete.no.options', comUser ) + "</div></form>");
			
			if (!window.delPopup) {
				window.delPopup = jQuery('<div class="b-popup-delcomm" />')
					.delegate('input.delete-comment-button', 'click', function () {
						window.delPopup.bubble('hide');
					});
			}
			
			window.delPopup
				.html(inHTML.join(' '))
				.bubble()
				.bubble('show', ae);
				
		} else if (action == 'unspam') {
			deleteComment(dItemid, action);
		}
	};
}

function poofAt (pos) {
    var de = document.createElement("div");
    de.style.position = "absolute";
    de.style.background = "#FFF";
    de.style.overflow = "hidden";
    var opp = 1.0;

    var top = pos.y;
    var left = pos.x;
    var width = 5;
    var height = 5;
    document.body.appendChild(de);

    var fade = function () {
        opp -= 0.15;
        width += 10;
        height += 10;
        top -= 5;
        left -= 5;

        if (opp <= 0.1) {
            de.parentNode.removeChild(de);
        } else {
            de.style.left = left + "px";
            de.style.top = top + "px";
            de.style.height = height + "px";
            de.style.width = width + "px";
            de.style.filter = "alpha(opacity=" + Math.floor(opp * 100) + ")";
            de.style.opacity = opp;
            window.setTimeout(fade, 20);
        }
    };
    fade();
}

function updateLink (ae, resObj, clickTarget) {
    ae.href = resObj.newurl;
    var userhook = window["userhook_" + resObj.mode + "_comment_ARG"];
    var did_something = 0;

    if (clickTarget && clickTarget.src && clickTarget.src == resObj.oldimage) {
        clickTarget.src = resObj.newimage;
        did_something = 1;
    }

    if (userhook) {
        userhook(resObj.id);
        did_something = 1;
    }

    // if all else fails, at least remove the link so they're not as confused
    if (! did_something) {
        if (ae && ae.style)
            ae.style.display = 'none';
        if (clickTarget && clickTarget.style)
            clickTarget.style.dispay = 'none';
    }

}

var tsInProg = {}  // dict of { ditemid => 1 }
function createModerationFunction(control, dItemid, action) {
	var action = action || 'screen',
		comUser = LJ_cmtinfo[dItemid].u;	
	
	return function (e) {
		var	e = jQuery.event.fix(e || window.event),
			pos = { x: e.pageX, y: e.pageY },
			modeParam = LiveJournal.parseGetArgs(location.href).mode,
			hourglass;
			
		e.stopPropagation();
		e.preventDefault();
			
		sendModerateRequest();

		function sendModerateRequest() {
			var	bmlName = (action == 'unspam') ? 'spamcomment' : 'talkscreen',
				postUrl = control.href.replace(new RegExp('.+' + bmlName + '\.bml'), LiveJournal.getAjaxUrl(bmlName)),
				postParams = { 'confirm': 'Y', lj_form_auth: decodeURIComponent(LJ_cmtinfo.form_auth) };
				
			if (action == 'unspam') {
				postUrl += '&jsmode=1';
			}
				
			hourglass = jQuery(e).hourglass()[0];
			
			jQuery.post(postUrl, postParams, function (json) {
				tsInProg[dItemid] = 0;
				
				if (action == 'unspam') {
					json = jQuery.parseJSON(json); 
					
					if (json.result) {
						removeEmptyMarkup(dItemid);
						hourglass.hide();
						return true;
					} else {
						alert(json.errormsg);
					}
				}
				
				if( LiveJournal.CommentManager.getState() !== 'iframe' ) {
					handleNew();
				} else {
					var ids = checkRcForNoCommentsPage();
					handleIframe(ids);
				}
			});
		}

		function handleNew() {
			var newNode, showExpand, j, children,
				threadId = dItemid,
				threadExpanded = !!(LJ_cmtinfo[ threadId ].oldvars && LJ_cmtinfo[ threadId ].full),
				populateComments = function (result) {
					LiveJournal.CommentManager.processThreadJSON( result, function( dtid, html ) {
						if( LJ_cmtinfo[ dtid ].full ){
							showExpand = !( 'oldvars' in LJ_cmtinfo[ dtid ]);
	
							//still show expand button if children comments are folded
							if( !showExpand ) {
								children  = LJ_cmtinfo[ dtid ].rc;
	
								for( j = 0; j < children.length;  ++j ) {
									if( !LJ_cmtinfo[ children[j] ].full && !LJ_cmtinfo[ children[j] ].is_deleted ) {
									// if( !( 'oldvars' in LJ_cmtinfo[ children[j] ] ) ) {
										showExpand = true;
									}
								}
							}
							
							if (!html) {
								removeEmptyMarkup(result[i].thread);
							}

							var newNode = ExpanderEx.prepareCommentBlock( html, dtid, showExpand );
	
							LiveJournal.CommentManager.updateCell( dtid, newNode );
						}
					} );
					hourglass.hide();
					poofAt(pos);
				};
	
			LiveJournal.CommentManager.getThreadJSON(threadId, function (result) {
				//if comment is expanded we need to fetch it's collapsed state additionally
				if( threadExpanded && LJ_cmtinfo[ threadId ].oldvars.full )
				{
					LiveJournal.CommentManager.getThreadJSON( threadId, function (result2) {
						ExpanderEx.Collection[ threadId ] = ExpanderEx.prepareCommentBlock( jQuery( "<div>" + result2[0].html + "</div>" ), threadId, true ).html()
						//ExpanderEx.Collection[ threadId ] = result2[0].html;
						populateComments( result );
					}, true, true );
				}
				else {
					populateComments( result );
				}
			}, false, !threadExpanded);
		}

		function handleIframe(ids) {
			// modified jQuery.fn.load
			jQuery.ajax({
				url: location.href,
				type: 'GET',
				dataType: 'html',
				complete: function (res, status) {
					// If successful, inject the HTML into all the matched elements
					if (status == 'success' || status == 'notmodified') {
						// Create a dummy div to hold the results
						var nodes = jQuery('<div/>')
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(res.responseText.replace(/<script(.|\s)*?\/script>/gi, ''))
							// Locate the specified elements
							.find(ids)
							.each(function () {
								var id = this.id.replace(/[^0-9]/g, '');
								if (LJ_cmtinfo[id].expanded) {
									var expand = this.innerHTML.match(/Expander\.make\(.+?\)/)[0];
									(function(){
										eval(expand);
									}).apply(document.createElement('a'));
								} else {
									jQuery('#' + this.id).replaceWith(this);
								}
							});
						hourglass.hide();
						poofAt(pos);
					}
				}
			});
		}

		function checkRcForNoCommentsPage() {
			var commsArray = [ dItemid ], ids;

			// check rc for no comments page
			if (LJ_cmtinfo[dItemid].rc) {
				if (/mode=(un)?freeze/.test(control.href)) {
					mapComms(dItemid);
				}
				ids = '#ljcmt' + commsArray.join(',#ljcmt');
			} else {
				var rpcRes;
				eval(json);
				updateLink(control, rpcRes, control.getElementsByTagName('img')[0]);
				// /tools/recent_comments.bml
				if (document.getElementById('ljcmtbar'+dItemid)) {
					ids = '#ljcmtbar' + dItemid;
				}
				// ex.: portal/
				else {
					hourglass.hide();
					poofAt(pos);
					return;
				}
			}
			
			
			function mapComms(id) {
				var i = -1, newId;
				
				while (newId = LJ_cmtinfo[id].rc[++i]) {
					if (LJ_cmtinfo[newId].full) {
						commsArray.push(newId);
						mapComms(String(newId));
					}
				}
			}
			
			return ids;
		}
		
		return false;
	}
}

function removeEmptyMarkup(threadId) {
	jQuery('#ljcmt' + threadId).remove();
}

(function( $, window ) {

	window.LiveJournal.CommentManager = function() {
		this.bindLinks();
	}

	LiveJournal.CommentManager.prototype.bindLinks = function() {
		$( 'body' ).delegate( 'a', 'click', function( ev ) {
			var rex_id = /id=(\d+)/, ae = this;

		if (ae.href.indexOf('talkscreen.bml') != -1) {
			var reMatch = rex_id.exec(ae.href);
			if (!reMatch) return;

			var id = reMatch[1];
			if (!document.getElementById('ljcmt' + id)) return;

			createModerationFunction(ae, id)( ev );
		} else if (ae.href.indexOf('delcomment.bml') != -1) {
			if (LJ_cmtinfo && LJ_cmtinfo.disableInlineDelete) return;

			var reMatch = rex_id.exec(ae.href);
			if (!reMatch) return;

			var id = reMatch[1];
			if (!document.getElementById('ljcmt' + id)) return;

			var action = (ae.href.indexOf('spam=1') != -1) ? 'markAsSpam' : 'delete';

			createDeleteFunction(ae, id, action)( ev );
		// unspam
		} else if (ae.href.indexOf('spamcomment.bml') != -1) {
			var reMatch = rex_id.exec(ae.href);
			if (!reMatch) return;

			var id = reMatch[1];
			if (!document.getElementById('ljcmt' + id)) return;
			createModerationFunction(ae, id, 'unspam')( ev );
		} else {
			return;
		}

			ev.preventDefault();
			ev.stopPropagation();
		} );
	}

	var manager = window.LiveJournal.CommentManager;

	window.LiveJournal.CommentManager.getState = function() {
		if( LJ_cmtinfo.use_old_thread_expander ) {
			return "iframe";
		} else {
			return "old";
		}
	}

	/**
	 * @param {Number} threadId Id of thread to update
	 * @param {Node} node Collection of nodes with new content
	 *
	 * @return {String} Returns a string containing old content of the cell;
	 */
	LiveJournal.CommentManager.updateCell = function( threadId, node ) {
		var cell = $( "#ljcmt" + threadId ),
			old_html = $( '<div></div>' ). append( cell.clone() );

		cell.replaceWith( $( node ).filter( "#ljcmt" + threadId ) );

		return old_html.html();
	}

	LiveJournal.CommentManager.getCell = function( threadId ) {
		return $( "#ljcmt" + threadId );
	}

	LiveJournal.CommentManager.getThreadJSON = function(threadId, success, getSingle)
	{
		var postid = location.href.match(/\/(\d+).html/)[1],
			modeParam = LiveJournal.parseGetArgs(location.href).mode,
			params = {
				journal: Site.currentJournal,
				itemid: postid,
				thread: threadId,
				depth: LJ_cmtinfo[ threadId ].depth
			};

		if( getSingle) {
			params.single = '1';
		}

		if (modeParam) {
			params.mode = modeParam;
		}

		var getArgs = LiveJournal.parseGetArgs( location.href );
		if( getArgs && !!getArgs.style && getArgs.style === "mine" ) {
			params.style = "mine";
		}

		var endpoint = LiveJournal.getAjaxUrl( 'get_thread' );
		jQuery.get( LiveJournal.constructUrl( endpoint, params ), success, 'json' );
	}

	LiveJournal.CommentManager.processThreadJSON = function( result, callback ) {
		var comment, dom;
		for( var i = 0; i < result.length; ++i ){
			if( !( result[ i ].thread in LJ_cmtinfo ) ) {
				continue;
			}
	
			comment = {};
			comment.is_deleted = ( result[i].state === "deleted" );
			if( comment.is_deleted ) {
				LJ_cmtinfo[ result[i].thread ].is_deleted = true;
			}
			dom = $( result[i].html ).filter( "#ljcmt" + result[i].thread );
			callback( result[i].thread, dom, comment );
		}
	}

	$( function() { new LiveJournal.CommentManager(); } );

}( jQuery, window ))

function LJ_Mul( a, b ) { return parseInt(a, 10) * parseInt(b, 10) }

function LJ_JoinURL( url /* parts */ ) {
	var add = [].slice.call( arguments, 1 ).join( '&' );

	url += ( url.indexOf( '?' ) > -1 ) ? '&' : '?';
	return url + add;
}

function LJ_Concat( /* parts */ ) {
	return [].slice.call( arguments, 0 ).join( '' );
}
;

/* file-end: js/commentmanage.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.lj.itemlist.js 
*/

/*!
 * LiveJournal ItemList
 * ItemList is responsible for displaying a list of items on the page
 * with ability to dynamically add and remove items
 *
 * Copyright 2011, dmitry.petrov@sup.com
 *
 * http://docs.jquery.com/UI
 * 
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 * Public methods:
 *	add(item) - add the item to the list
 *	remove(item) - remove the item to the list
 *	hasItem(item) - check the existence of an element in the list
 *	empty() - clean the list
 *	length() - get the length of the list
 *	updateLast() - update the last item
 *
 * Usage:
 *	<script>
 *		$('item-list-parent')
 *			.itemList()
 *			.itemList('publicMethod')
 *			.itemList({ many: options })
 *			.itemList('option', 'getOptionName')
 *			.itemList('option', 'setOptionName', 'setOptionValue');
*			});
 *	</script>
 */

(function($){

	$.widget('lj.itemList', $.lj.basicWidget, {
		options: {
			classNames: {
				hover: 'ljappippu_share_person_hover',
				lastItem: 'ljappippu_share_person_last'
			},

			selectors: {
				last: ':last',
				item: 'li'
			},

			onNewElement: function(item){
				return item;
			},

			onSelect: function(item){
			},

			items: []
		},

		_create: function(){
			this.items = {};
			this._length = 0;

			if(this.options.items.length > 0){
				for(var i = 0; i < this.options.items.length; ++i){
					this.add(this.options.items[i]);
				}
				this.updateLast();
			}
		},

		add: function(item, dom){
			if(this.hasItem(item)){
				return;
			}
			
			var dom = dom || this.options.onNewElement(item);

			if(dom.length){
				var hoverClass = this.options.hoverClass;
				
				dom.unbind('.itemList');

				if(hoverClass){
					dom.bind('mouseover.itemList', function(){
						$(this).addClass(hoverClass)
					}).bind('mouseout.itemList', function(){
						$(this).removeClass(hoverClass)
					});
				}
				
				dom.bind('click.itemList', item, this.options.onSelect);

				if(this.element[0] != dom[0].parentNode){
					this.element.append(dom);
				}

				this.items[item] = dom;
				this._length++;
			}
		},

		hasItem: function(item){
			return item in this.items;
		},

		updateLast: function(){
			if(!this.options.classNames.lastItem) {
				return;
			}

			if(this._lastItem){
				this._lastItem.removeClass(this.options.classNames.lastItem);
			}

			var newLast = this.element.children(this.options.selectors.last);

			if(newLast.size() > 0){
				this._lastItem = newLast;
				this._lastItem.addClass(this.options.classNames.lastItem);
			} else {
				this._lastItem = null;
			}
		},

		nodes: function() {
			var collection = jQuery();

			for (var item in this.items) {
				if (this.items.hasOwnProperty(item)) {
					collection = collection.add(this.items[item]);
				}
			}

			return collection.length > 0 ? collection : null;
		},

		remove: function(item){
			if(this.hasItem(item)){
				this.items[item].unbind('.itemList').remove();
				delete this.items[item];
				this._length--;
			}
		},

		empty: function(){
			for(var i in this.items){
				this.remove(i);
			}
		},

		length: function(){
			return this._length;
		},

		item: function (item) {
			return this.items[item] || jQuery(); 
		}
	});

})(jQuery);
;

/* file-end: js/jquery/jquery.lj.itemlist.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/apps.js 
*/

var appManager = (function ($) {
	return {
		CONFIG : {
			// LiveJournal API namespace
			globalLJVarName : 'LiveJournal',
			accessRequestElemId : 'appPopup_accessRequest',
			accessSubmitElemId : 'appPopup_accessSubmit',
			accessCancelElemId : 'appPopup_accessCancel',
			accessTitleElemId : 'appPopup_accessTitle',
			accessDescElemId : 'appPopup_accessDesc'
		},

		init : function (opt) {
			var CONFIG = this.CONFIG;

			$.extend(CONFIG, opt);

			var elems = this.quiz.elems;
			elems.container = $('#' + CONFIG.accessRequestElemId);
			elems.submit = $('#' + CONFIG.accessSubmitElemId);
			elems.cancel = $('#' + CONFIG.accessCancelElemId);
			elems.title = $('#' + CONFIG.accessTitleElemId);
			elems.desc = $('#' + CONFIG.accessDescElemId);

			elems.buttons = elems.submit.add(elems.cancel).removeAttr('disabled');

			elems.userAccessField = elems.container.find('input[name=user_access]');
			elems.idField = elems.container.find('input[name=id]');
			elems.actionField = elems.container.find('input[name=action]');
			elems.extraField = elems.container.find('input[name=extra]');
			elems.userAccessCheckboxes = elems.container.find('input[name=user_access_cb]');

			this.queryArgs = window[CONFIG.globalLJVarName].parseGetArgs(window.location.href);
			this.action = this.queryArgs.act;
			this.extra = this.queryArgs.extra || '';
			this.returnTo = this.queryArgs['return'] || '';

			this.bindEvents();

			this.startDialog();
		},

		startDialog : function () {
			this.quiz.appId = this.queryArgs.id;
			this.quiz.elems.formToSend = this.quiz.elems.container;

			this.quiz.action = this.action;
			this.quiz.extra = this.extra;
			this.quiz.returnTo = this.returnTo;

			this.quiz.start();
		},

		bindEvents : function () {
			var that = this;

			this.quiz.elems.submit.click(function (e) {
				e.preventDefault();

				that.quiz.sendResults();
			});

			this.quiz.elems.userAccessCheckboxes.change( function() {
				var boxes = that.quiz.elems.userAccessCheckboxes,
					accessArray = [];

				boxes.filter(':checked').each( function() {
					accessArray.push( this.value );
				} );

				that.quiz.results = accessArray.join( "," );
			} ).change();

			this.quiz.elems.cancel.click(function (e) {
				e.preventDefault();
				that.quiz.stop();
			});
		},

		quiz : {
			appsUrl: '/games',
			appsSettingsUrl: '/manage/settings/?cat=userapps',
			appId : '',
			action : '',
			elems : {},
			results : [],

			start : function () {
			},
			stop : function () {
				this.action = 'cancel';
				//this.sendResults();
				this.cancelAction();
			},
			cancelAction : function () {
				if( this.returnTo.length > 0 && this.returnTo == 'settings' ) {
					document.location = this.appsSettingsUrl;
				} else {
					document.location = this.appsUrl;
				}
			},
			sendResults : function () {
				this.elems.buttons.attr('disabled', 'disabled');

				this.elems.userAccessField.val(this.results);
				this.elems.idField.val(this.appId);
				this.elems.actionField.val(this.action);
				this.elems.extraField.val(this.extra);

				this.elems.formToSend.submit();
			}
		}
	};
})(jQuery);

/**
 * Script for displaying recipients list in request share dialog in applications.
 * Current version refreshes all list on every change.
 * Current version can handle only one list on the page.
 */
var recipientsSelector  = (function ($) {
		var CONFIG = {
			perPage: 20, //if zero, we display all persons on a single page
			personsContainerSelector: '.ljappippu_share_persons',
			personsTpl: '#ljappippu_share_person',
			firstLink: ".i-qotd-nav-first",
			lastLink: ".i-qotd-nav-last",
			prevLink: ".i-qotd-nav-prev",
			nextLink: ".i-qotd-nav-next",
			firstLinkDis: "i-qotd-nav-first-dis",
			lastLinkDis: "i-qotd-nav-last-dis",
			prevLinkDis: "i-qotd-nav-prev-dis",
			nextLinkDis: "i-qotd-nav-next-dis",
			counterCurrent: ".i-pages-current",
			counterTotal: ".i-pages-total",
			onSelect: function( friendObject ){}
		};

		/**
		 * Internal class, responsible to handle friends list taking into account their visibility
		 */
		function FriendList()
		{
			this._friends = [];
			//array to store visible items references
			this._visibleArr = [];
			this._needRebuild = true;
		}

		/** If item visibilite had changed we rebuild all helper array */
		FriendList.prototype._rebuildVisible = function() {
			this._visibleArr = [];

			for( var i = 0; i < this._friends.length; ++i ) {
				if( this._friends[ i ].visible && this._friends[ i ].filtered ) {
					this._visibleArr.push( this._friends[ i ]);
				}
			}
			this._needRebuild = false;
		}

		FriendList.prototype.add = function( name, visible ) {
			this._friends.push( {
				username: name,
				visible: visible,
				filtered: true //if false we also hide this item
			} )

			if( visible ) {
				//this items will be the last visible, so no need to rebuild
				this._visibleArr.push( this._friends)
			}
		}

		FriendList.prototype.setVisible = function( name, visible ) {
			var friend = this.getFriend( name );

			if( friend && friend.username === name ) {
				if( friend.visible != visible ) {
					friend.visible = visible;
					this._needRebuild = true;
					return true;
				}
				return false;
			}
		}

		FriendList.prototype.getVisibleLength = function() {
			if( this._needRebuild ) {
				this._rebuildVisible();
			}

			return this._visibleArr.length;
		}

		FriendList.prototype.getVisibleFriend = function( idx ) {
			if( this._needRebuild ) {
				this._rebuildVisible();
			}

			if( idx >= 0 && idx < this._visibleArr.length ) {
				return $.extend( {}, this._visibleArr[ idx ] );
			}

			return null;
		}

		FriendList.prototype.getFriend = function( name ) {
			for( var i = 0; i < this._friends.length; ++i ) {
				if( this._friends[ i ].username === name ) {
					return this._friends[ i ];
				}
			}

			return null;
		}

		FriendList.prototype.filterFriends = function( mask ) {
			mask = mask || "";
			var needRebuild = false,
				oldVal, friend;

			for( var i = 0; i < this._friends.length; ++i ) {
				friend = this._friends[ i ];
				oldVal = friend.filtered;
				friend.filtered = ( mask.length > 0 ) ? ( friend.username.indexOf( mask ) !== -1 ) : true;

				if( oldVal !== friend.filtered ) {
					this._needRebuild = true;
				}
			}

			if( this._needRebuild ) {
				this._rebuildVisible();
			}
		}

		var options, list, currentPage, friends;

		function showPage( num ) {
			if( num <= 0 ) { return; }
			var items = fetchFriendsList( num );
			if( !items ) {
				if( num === 1 ) {
					list.itemList( 'empty' );
				} else {
					showPage( num - 1 );
				}
				updatePager();
				return;
			}

			currentPage = num;
			list.itemList( 'empty' );
			for( var i = 0; i < items.length; ++i ) {
				list.itemList( 'add', items[ i ] );
			}
			list.itemList( 'updateLast' );

			updatePager();
		}

		function fetchFriendsList( page ) {
			var start, end;

			if( options.perPage === 0 ) {
				start = 0;
				end = friends.getVisibleLength();
			} else {
				start = ( page - 1 ) * options.perPage;
				end = page * options.perPage;
			}

			if( start >= friends.getVisibleLength() ) {
				return false;
			}

			var list = [];
			var f;
			for( var i = start; i < end; ++i ) {
				f = friends.getVisibleFriend( i );
				if( f ) {
					list.push( f.username );
				} else {
					break;
				}
			}

			return ( list.length === 0 ) ? false : list;
		}

		function updatePager() {
			//probably there is no pager if we show all items
			if( options.perPage === 0 ) {
				return;
			}
			var pagesTotal = Math.ceil( friends.getVisibleLength() / options.perPage );
			el.counterTotal.html( pagesTotal );
			el.counterCurrent.html( currentPage || 0 );

			el.firstLink[ ( pagesTotal === 0 || currentPage === 1 ) ? "addClass" : "removeClass" ]( options.firstLinkDis );
			el.lastLink[ ( pagesTotal === 0 || currentPage === pagesTotal ) ? "addClass" : "removeClass" ]( options.lastLinkDis );
			el.prevLink[ ( pagesTotal === 0 || currentPage === 1 ) ? "addClass" : "removeClass" ]( options.prevLinkDis );
			el.nextLink[ ( pagesTotal === 0 || currentPage === pagesTotal ) ? "addClass" : "removeClass" ]( options.nextLinkDis );
		}

		function updateState() {
			showPage( currentPage );
		}

		function bindControls() {
			el.firstLink.mousedown( function( ev ) {
				showPage(1);
				ev.preventDefault();
			} );
			el.lastLink.mousedown( function( ev ) {
				var pagesTotal = Math.ceil( friends.getVisibleLength() / options.perPage );
				showPage( pagesTotal );
				ev.preventDefault();
			} );
			el.prevLink.mousedown( function( ev ) {
				showPage( currentPage - 1);
				ev.preventDefault();
			} );
			el.nextLink.mousedown( function( ev ) {
				showPage( currentPage + 1);
				ev.preventDefault();
			} );
		}

		function filter( mask ) {
			friends.filterFriends( mask );
			showPage( currentPage );
		}

		return {
			init: function( opts ) {
				options = $.extend( {}, CONFIG, opts );
				el = {
					firstLink: $( options.firstLink ),
					lastLink: $( options.lastLink ),
					prevLink: $( options.prevLink ),
					nextLink: $( options.nextLink ),
					counterCurrent: $( options.counterCurrent ),
					counterTotal: $( options.counterTotal ),
					personsContainer: $( options.personsContainer ),
					personsTpl: $( options.personsTpl )
				}

				list = $( '.ljappippu_share_persons' ).itemList( {
					classNames: {
						hover: "ljappippu_share_person_hover"
					},
					onNewElement: function( item ) {
						return el.personsTpl.tmpl( { username: item } );
					},
					onSelect: function( ev ) {
						var item = ev.data;
						options.onSelect( friends.getFriend( item ) );
						if( friends.setVisible( item, false ) ) {
							updateState();
						}

						ev.preventDefault();
					}
				} );

				friends = new FriendList();
				for( var i = 0; i < options.friends.length; ++i ) {
					friends.add( options.friends[ i ].display_name, !options.friends[ i ].selected );
				}

				bindControls();
				showPage( 1 );
			},
			add: function( item ) {
				if( friends.setVisible( item, true ) ){
					updateState();
				}
			},

			filter: function( mask ) {
				filter( mask );
			}
		};
})(jQuery);
;

/* file-end: js/apps.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/apps/appcontainer.js 
*/

var gadgets=window.gadgets||{},shindig=window.shindig||{},osapi=window.osapi||{},livejournal=window.livejournal||{};gadgets.util=gadgets.util||{};gadgets.util.makeClosure=function(a,b){for(var c=[],d=2,e=arguments.length;d<e;++d)c.push(arguments[d]);return function(){for(var f=c.slice(),i=0,h=arguments.length;i<h;++i)f.push(arguments[i]);return b.apply(a,f)}};gadgets.util.makeEnum=function(a){var b,c,d={};for(b=0;c=a[b];++b)d[c]=c;return d};gadgets.util=gadgets.util||{};
(function(){gadgets.util.createElement=function(a){var b;if(!document.body||document.body.namespaceURI)try{b=document.createElementNS("http://www.w3.org/1999/xhtml",a)}catch(c){}return b||document.createElement(a)};gadgets.util.createIframeElement=function(a){var b=gadgets.util.createElement("iframe");try{var c,d=["<","iframe"],e=a||{},f;for(f in e)if(e.hasOwnProperty(f)){d.push(" ");d.push(f);d.push('="');d.push(gadgets.util.escapeString(e[f]));d.push('"')}d.push("></");d.push("iframe");d.push(">");
c=d.join("");var i=gadgets.util.createElement(c);if(i&&(!b||i.tagName==b.tagName&&i.namespaceURI==b.namespaceURI))b=i}catch(h){}c=b;a=a||{};for(var k in a)if(a.hasOwnProperty(k))c[k]=a[k];return b};gadgets.util.getBodyElement=function(){if(document.body)return document.body;try{var a=document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml","body");if(a&&a.length==1)return a[0]}catch(b){}return document.documentElement||document}})();gadgets.util=gadgets.util||{};gadgets.util.attachBrowserEvent=function(a,b,c,d){if(typeof a.addEventListener!="undefined")a.addEventListener(b,c,d);else typeof a.attachEvent!="undefined"?a.attachEvent("on"+b,c):gadgets.warn("cannot attachBrowserEvent: "+b)};gadgets.util.removeBrowserEvent=function(a,b,c,d){if(a.removeEventListener)a.removeEventListener(b,c,d);else a.detachEvent?a.detachEvent("on"+b,c):gadgets.warn("cannot removeBrowserEvent: "+b)};gadgets.util=gadgets.util||{};(function(){var a=[];gadgets.util.registerOnLoadHandler=function(b){a.push(b)};gadgets.util.runOnLoadHandlers=function(){for(var b=0,c=a.length;b<c;++b)a[b]()}})();gadgets.util=gadgets.util||{};
(function(){function a(c,d){return String.fromCharCode(d)}var b={0:false,10:true,13:true,34:true,39:true,60:true,62:true,92:true,8232:true,8233:true,65282:true,65287:true,65308:true,65310:true,65340:true};gadgets.util.escape=function(c,d){if(c)if(typeof c==="string")return gadgets.util.escapeString(c);else if(typeof c==="array")for(var e=0,f=c.length;e<f;++e)c[e]=gadgets.util.escape(c[e]);else{if(typeof c==="object"&&d){e={};for(f in c)if(c.hasOwnProperty(f))e[gadgets.util.escapeString(f)]=gadgets.util.escape(c[f],
true);return e}}else return c;return c};gadgets.util.escapeString=function(c){if(!c)return c;for(var d=[],e,f,i=0,h=c.length;i<h;++i){e=c.charCodeAt(i);f=b[e];if(f===true)d.push("&#",e,";");else f!==false&&d.push(c.charAt(i))}return d.join("")};gadgets.util.unescapeString=function(c){if(!c)return c;return c.replace(/&#([0-9]+);/g,a)}})();gadgets.util=gadgets.util||{};
(function(){var a=null;gadgets.util.getUrlParameters=function(b){var c=typeof b==="undefined";if(a!==null&&c)return a;var d={};b=b||document.location.href;var e=b.indexOf("?"),f=b.indexOf("#");b=(f===-1?b.substr(e+1):[b.substr(e+1,f-e-1),"&",b.substr(f+1)].join("")).split("&");e=window.decodeURIComponent?decodeURIComponent:unescape;f=0;for(var i=b.length;f<i;++f){var h=b[f].indexOf("=");if(h!==-1){var k=b[f].substring(0,h);h=b[f].substring(h+1);h=h.replace(/\+/g," ");try{d[k]=e(h)}catch(j){}}}if(c)a=
d;return d}})();gadgets.util.getUrlParameters();gadgets.util=gadgets.util||{};(function(){function a(d){b=d["core.util"]||{}}var b={},c={};gadgets.config&&gadgets.config.register("core.util",null,a);gadgets.util.getFeatureParameters=function(d){return typeof b[d]==="undefined"?null:b[d]};gadgets.util.hasFeature=function(d){return typeof b[d]!=="undefined"};gadgets.util.getServices=function(){return c}})();if(window.JSON&&window.JSON.parse&&window.JSON.stringify)gadgets.json=function(){function a(c){return this[c]}var b=/___$/;return{parse:function(c){try{return window.JSON.parse(c)}catch(d){return false}},stringify:function(c){function d(h){return e.call(this,h,a)}var e=window.JSON.stringify,f=Array.prototype.toJSON&&e([{x:1}])==='"[{\\"x\\": 1}]"'?d:e;try{return f(c,function(h,k){return!b.test(h)?k:void 0})}catch(i){return null}}}}();if(!(window.JSON&&window.JSON.parse&&window.JSON.stringify))gadgets.json=function(){function a(d){return d<10?"0"+d:d}function b(d){var e,f,i;e=/[\"\\\x00-\x1f\x7f-\x9f]/g;switch(typeof d){case "string":return e.test(d)?'"'+d.replace(e,function(h){var k=c[h];if(k)return k;k=h.charCodeAt();return"\\u00"+Math.floor(k/16).toString(16)+(k%16).toString(16)})+'"':'"'+d+'"';case "number":return isFinite(d)?String(d):"null";case "boolean":case "null":return String(d);case "object":if(!d)return"null";e=[];
if(typeof d.length==="number"&&!d.propertyIsEnumerable("length")){i=d.length;for(f=0;f<i;f+=1)e.push(b(d[f])||"null");return"["+e.join(",")+"]"}for(f in d)if(!/___$/.test(f))if(d.hasOwnProperty(f))if(typeof f==="string")(i=b(d[f]))&&e.push(b(f)+":"+i);return"{"+e.join(",")+"}"}return""}Date.prototype.toJSON=function(){return[this.getUTCFullYear(),"-",a(this.getUTCMonth()+1),"-",a(this.getUTCDate()),"T",a(this.getUTCHours()),":",a(this.getUTCMinutes()),":",a(this.getUTCSeconds()),"Z"].join("")};var c=
{"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};return{stringify:b,parse:function(d){if(/^[\],:{}\s]*$/.test(d.replace(/\\["\\\/b-u]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return eval("("+d+")");return false}}}();gadgets.json.flatten=function(a){var b={};if(a===null||a===undefined)return b;for(var c in a)if(a.hasOwnProperty(c)){var d=a[c];null===d||undefined===d||(b[c]=typeof d==="string"?d:gadgets.json.stringify(d))}return b};gadgets.log=function(){function a(e,f){if(!(e<c||!d))if(e===2&&d.warn)d.warn(f);else if(e===3&&d.error)d.error(f);else d.log&&d.log(f)}var b=function(e){a(1,e)};gadgets.warn=function(e){a(2,e)};gadgets.error=function(e){a(3,e)};gadgets.setLogLevel=function(e){c=e};b.INFO=1;b.WARNING=2;b.NONE=4;var c=1,d=window.console?window.console:window.opera?window.opera.postError:undefined;return b}();if(!window.gadgets.config)gadgets.config=function(){function a(k,j){for(var m in j)if(j.hasOwnProperty(m))if(typeof k[m]==="object"&&typeof j[m]==="object")a(k[m],j[m]);else k[m]=j[m]}function b(){var k=document.scripts||document.getElementsByTagName("script");if(!k||k.length==0)return null;var j;if(f.u)for(var m=0;!j&&m<k.length;++m){var l=k[m];if(l.src&&l.src.indexOf(f.u)==0)j=l}j||(j=k[k.length-1]);if(!j.src)return null;return j}function c(k){var j="";if(k.nodeType==3||k.nodeType==4)j=k.nodeValue;
else if(k.innerText)j=k.innerText;else if(k.innerHTML)j=k.innerHTML;else if(k.firstChild){j=[];for(k=k.firstChild;k;k=k.nextSibling)j.push(c(k));j=j.join("")}return j}function d(k){var j=b();if(j){var m;j=c(j);try{m=(new Function("return ("+j+"\n)"))()}catch(l){}if(typeof m==="object")m=m;else{try{m=(new Function("return ({"+j+"\n})"))()}catch(o){}m=typeof m==="object"?m:{}}if(f.f&&f.f.length==1)if(!m[f.f[0]]){j={};j[f.f[0]]=m;m=j}a(k,m);(m=window.___cfg)&&a(k,m)}}function e(k){for(var j in i)if(i.hasOwnProperty(j))for(var m=
i[j],l=0,o=m.length;l<o;++l)k(j,m[l])}var f,i={},h={};return{register:function(k,j,m,l){var o=i[k];if(!o){o=[];i[k]=o}o.push({validators:j||{},callback:m,callOnUpdate:l})},get:function(k){if(k)return h[k]||{};return h},init:function(k,j){f=window.___jsl||{};a(h,k);d(h);a(h,window.___config||{});e(function(m,l){var o=h[m];if(o&&!j){var r=l.validators,q;for(q in r)if(r.hasOwnProperty(q))if(!r[q](o[q]))throw Error('Invalid config value "'+o[q]+'" for parameter "'+q+'" in component "'+m+'"');}l.callback&&
l.callback(h)})},update:function(k,j){var m=[];e(function(r,q){if(k.hasOwnProperty(r)||j&&h&&h[r])q.callback&&q.callOnUpdate&&m.push(q.callback)});h=j?{}:h||{};a(h,k);for(var l=0,o=m.length;l<o;++l)m[l](h)}}}();gadgets.io=function(){function a(){var j;if(typeof shindig!="undefined"&&shindig.xhrwrapper&&shindig.xhrwrapper.createXHR)return shindig.xhrwrapper.createXHR();else if(typeof ActiveXObject!="undefined"){(j=new ActiveXObject("Msxml2.XMLHTTP"))||(j=new ActiveXObject("Microsoft.XMLHTTP"));return j}else if(typeof XMLHttpRequest!="undefined"||window.XMLHttpRequest)return new window.XMLHttpRequest;else throw"no xhr available";}function b(j,m){if(j.readyState!==4)return true;try{if(j.status!==200){var l=
""+j.status;if(j.responseText)l=l+" "+j.responseText;m({errors:[l],rc:j.status,text:j.responseText});return true}}catch(o){m({errors:[o.number+" Error not specified"],rc:o.number,text:o.description});return true}return false}function c(j,m,l,o){b(o,m)||m(e(l,{body:o.responseText}))}function d(j,m,l,o){if(!b(o,m)){o=o.responseText;var r=o.indexOf(k)+k.length;if(!(r<k.length)){o=o.substr(r);o=eval("("+o+")");o=o[j];if(o.oauthState)h=o.oauthState;o.st&&shindig.auth.updateSecurityToken(o.st);m(e(l,o))}}}
function e(j,m){var l={text:m.body,rc:m.rc||200,headers:m.headers,oauthApprovalUrl:m.oauthApprovalUrl,oauthError:m.oauthError,oauthErrorText:m.oauthErrorText,oauthErrorTrace:m.oauthErrorTrace,oauthErrorUri:m.oauthErrorUri,oauthErrorExplanation:m.oauthErrorExplanation,errors:[]};if(l.rc<200||l.rc>=400)l.errors=[l.rc+" Error"];else if(l.text){if(l.rc>=300&&l.rc<400)j.CONTENT_TYPE="TEXT";switch(j.CONTENT_TYPE){case "JSON":case "FEED":l.data=gadgets.json.parse(l.text);if(!l.data){l.errors.push("500 Failed to parse JSON");
l.rc=500;l.data=null}break;case "DOM":var o;if(typeof ActiveXObject!="undefined"){o=new ActiveXObject("Microsoft.XMLDOM");o.async=false;o.validateOnParse=false;o.resolveExternals=false;if(o.loadXML(l.text))l.data=o;else{l.errors.push("500 Failed to parse XML");l.rc=500}}else{o=(new DOMParser).parseFromString(l.text,"text/xml");if("parsererror"===o.documentElement.nodeName){l.errors.push("500 Failed to parse XML");l.rc=500}else l.data=o}break;default:l.data=l.text}}return l}function f(j,m,l,o,r,q,
t,p){var z=a();if(m.indexOf("//")==0)m=document.location.protocol+m;z.open(r,m,true);if(l)z.onreadystatechange=gadgets.util.makeClosure(null,t,j,l,q,z);if(o!==null){j="application/x-www-form-urlencoded";if(typeof p==="string"){j=p;p={}}p=p||{};p["Content-Type"]||(p["Content-Type"]=j);for(var x in p)z.setRequestHeader(x,p[x])}z.send(o)}var i={},h,k="throw 1; < don't be evil' >";gadgets.config.register("core.io",null,function(j){i=j["core.io"]||{}});return{makeRequest:function(j,m,l){l=l||{};var o=
l.METHOD||"GET",r=l.REFRESH_INTERVAL,q,t;if(l.AUTHORIZATION&&l.AUTHORIZATION!=="NONE"){q=l.AUTHORIZATION.toLowerCase();t=shindig.auth.getSecurityToken()}else if(o==="GET"&&r===undefined)r=3600;var p=true;if(typeof l.OWNER_SIGNED!=="undefined")p=l.OWNER_SIGNED;var z=true;if(typeof l.VIEWER_SIGNED!=="undefined")z=l.VIEWER_SIGNED;var x=l.HEADERS||{};if(o==="POST"&&!x["Content-Type"])x["Content-Type"]="application/x-www-form-urlencoded";var A=gadgets.util.getUrlParameters();t={url:j,httpMethod:o,headers:gadgets.io.encodeValues(x,
false),postData:l.POST_DATA||"",authz:q||"",st:t||"",contentType:l.CONTENT_TYPE||"TEXT",numEntries:l.NUM_ENTRIES||"3",getSummaries:!!l.GET_SUMMARIES,signOwner:p,signViewer:z,gadget:A.url,container:A.container||A.synd||"default",bypassSpecCache:gadgets.util.getUrlParameters().nocache||"",getFullHeaders:!!l.GET_FULL_HEADERS};if(q==="oauth"||q==="signed"||q==="oauth2"){if(gadgets.io.oauthReceivedCallbackUrl_){t.OAUTH_RECEIVED_CALLBACK=gadgets.io.oauthReceivedCallbackUrl_;gadgets.io.oauthReceivedCallbackUrl_=
null}t.oauthState=h||"";for(var v in l)if(l.hasOwnProperty(v))if(v.indexOf("OAUTH_")===0||v==="code")t[v]=l[v]}q=i.jsonProxyUrl.replace("%host%",document.location.host);a:{if(gadgets.io.preloaded_&&t.httpMethod==="GET")for(v=0;v<gadgets.io.preloaded_.length;v++)if((p=gadgets.io.preloaded_[v])&&p.id===t.url){delete gadgets.io.preloaded_[v];if(p.rc!==200)m({rc:p.rc,errors:[p.rc+" Error"]});else{if(p.oauthState)h=p.oauthState;m(e(l,{body:p.body,rc:p.rc,headers:p.headers,oauthApprovalUrl:p.oauthApprovalUrl,
oauthError:p.oauthError,oauthErrorText:p.oauthErrorText,oauthErrorTrace:p.oauthErrorTrace,oauthErrorUri:p.oauthErrorUri,oauthErrorExplanation:p.oauthErrorExplanation,errors:[]}))}v=true;break a}v=false}if(!v)if(o==="GET"&&r>0){o="?refresh="+r+"&"+gadgets.io.encodeValues(t);f(j,q+o,m,null,"GET",l,d)}else f(j,q,m,gadgets.io.encodeValues(t),"POST",l,d)},makeNonProxiedRequest:function(j,m,l,o){l=l||{};f(j,j,m,l.POST_DATA,l.METHOD,l,c,o)},clearOAuthState:function(){h=undefined},encodeValues:function(j,
m){var l=!m,o=[],r=false,q;for(q in j)if(j.hasOwnProperty(q)&&!/___$/.test(q)){if(r)o.push("&");else r=true;o.push(l?encodeURIComponent(q):q);o.push("=");o.push(l?encodeURIComponent(j[q]):j[q])}return o.join("")},getProxyUrl:function(j,m){var l=i.proxyUrl;if(!l)return l;var o=m||{},r=o.REFRESH_INTERVAL;if(r===undefined)r="3600";var q=gadgets.util.getUrlParameters();o=o.rewriteMime?"&rewriteMime="+encodeURIComponent(o.rewriteMime):"";l=l.replace("%url%",encodeURIComponent(j)).replace("%host%",document.location.host).replace("%rawurl%",
j).replace("%refresh%",encodeURIComponent(r)).replace("%gadget%",encodeURIComponent(q.url)).replace("%container%",encodeURIComponent(q.container||q.synd||"default")).replace("%rewriteMime%",o);if(l.indexOf("//")==0)l=window.location.protocol+l;return l}}}();
gadgets.io.RequestParameters=gadgets.util.makeEnum(["METHOD","CONTENT_TYPE","POST_DATA","HEADERS","AUTHORIZATION","NUM_ENTRIES","GET_SUMMARIES","GET_FULL_HEADERS","REFRESH_INTERVAL","OAUTH_SERVICE_NAME","OAUTH_USE_TOKEN","OAUTH_TOKEN_NAME","OAUTH_REQUEST_TOKEN","OAUTH_REQUEST_TOKEN_SECRET","OAUTH_RECEIVED_CALLBACK"]);gadgets.io.MethodType=gadgets.util.makeEnum(["GET","POST","PUT","DELETE","HEAD"]);gadgets.io.ContentType=gadgets.util.makeEnum(["TEXT","DOM","JSON","FEED"]);
gadgets.io.AuthorizationType=gadgets.util.makeEnum(["NONE","SIGNED","OAUTH","OAUTH2"]);gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.wpm)gadgets.rpctx.wpm=function(){function a(f,i,h){if(typeof window.addEventListener!="undefined")window.addEventListener(f,i,h);else typeof window.attachEvent!="undefined"&&window.attachEvent("on"+f,i)}function b(f){var i=gadgets.json.parse(f.data);if(i&&i.f){var h=gadgets.rpc.getTargetOrigin(i.f);e&&(typeof f.origin!=="undefined"?f.origin!==h:f.domain!==/^.+:\/\/([^:]+).*/.exec(h)[1])||c(i,f.origin)}}var c,d,e=true;return{getCode:function(){return"wpm"},isParentVerifiable:function(){return true},
init:function(f,i){gadgets.config.register("rpc",null,function(h){if(String((h?h.rpc:{}).disableForceSecure)==="true")e=false});c=f;d=i;a("message",b,false);d("..",true);return true},setup:function(f){d(f,true);return true},call:function(f,i,h){var k=gadgets.rpc.getTargetOrigin(f),j=gadgets.rpc._getTargetWin(f);k?window.setTimeout(function(){j.postMessage(gadgets.json.stringify(h),k)},0):gadgets.error("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message");return true}}}();gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.nix)gadgets.rpctx.nix=function(){function a(){var h=e[".."];if(!h)if(++i>c){gadgets.warn("Nix transport setup failed, falling back...");f("..",false)}else{if(!h&&window.opener&&"GetAuthToken"in window.opener){h=window.opener;if(h.GetAuthToken()==gadgets.rpc.getAuthToken("..")){var k=gadgets.rpc.getAuthToken("..");h.CreateChannel(window[b]("..",k),k);e[".."]=h;window.opener=null;f("..",true);return}}window.setTimeout(function(){a()},d)}}var b="GRPC____NIXVBS_get_wrapper",c=10,d=500,
e={},f,i=0;return{getCode:function(){return"nix"},isParentVerifiable:function(){return false},init:function(h,k){f=k;if(typeof window[b]!=="unknown"){window.GRPC____NIXVBS_handle_message=function(l){window.setTimeout(function(){h(gadgets.json.parse(l))},0)};window.GRPC____NIXVBS_create_channel=function(l,o,r){if(gadgets.rpc.getAuthToken(l)===r){e[l]=o;f(l,true)}};var j="Class GRPC____NIXVBS_wrapper\n Private m_Intended\nPrivate m_Auth\nPublic Sub SetIntendedName(name)\n If isEmpty(m_Intended) Then\nm_Intended = name\nEnd If\nEnd Sub\nPublic Sub SetAuth(auth)\n If isEmpty(m_Auth) Then\nm_Auth = auth\nEnd If\nEnd Sub\nPublic Sub SendMessage(data)\n GRPC____NIXVBS_handle_message(data)\nEnd Sub\nPublic Function GetAuthToken()\n GetAuthToken = m_Auth\nEnd Function\nPublic Sub CreateChannel(channel, auth)\n Call GRPC____NIXVBS_create_channel(m_Intended, channel, auth)\nEnd Sub\nEnd Class\nFunction "+
b+"(name, auth)\nDim wrap\nSet wrap = New GRPC____NIXVBS_wrapper\nwrap.SetIntendedName name\nwrap.SetAuth auth\nSet "+b+" = wrap\nEnd Function";try{window.execScript(j,"vbscript")}catch(m){return false}}return true},setup:function(h,k){if(h===".."){a();return true}try{var j=document.getElementById(h),m=window[b](h,k);j.contentWindow.opener=m}catch(l){return false}return true},call:function(h,k,j){try{e[h]&&e[h].SendMessage(gadgets.json.stringify(j))}catch(m){return false}return true}}}();if(!window.gadgets.rpc){gadgets.rpc=function(){function a(g,n){if(!H[g]){var u=E;n||(u=J);H[g]=u;for(var s=I[g]||[],y=0;y<s.length;++y){var w=s[y];w.t=A[g];u.call(g,w.f,w)}I[g]=[]}}function b(){function g(){Q=true}if(!R){if(typeof window.addEventListener!="undefined")window.addEventListener("unload",g,false);else typeof window.attachEvent!="undefined"&&window.attachEvent("onunload",g);R=true}}function c(g,n,u,s,y){if(!A[n]||A[n]!==u){gadgets.error("Invalid auth token. "+A[n]+" vs "+u);K(n,M)}y.onunload=
function(){if(B[n]&&!Q){K(n,S);gadgets.rpc.removeReceiver(n)}};b();s=gadgets.json.parse(decodeURIComponent(s))}function d(g,n){if(g&&typeof g.s==="string"&&typeof g.f==="string"&&g.a instanceof Array){if(A[g.f])if(A[g.f]!==g.t){gadgets.error("Invalid auth token. "+A[g.f]+" vs "+g.t);K(g.f,M)}if(g.s==="__ack")window.setTimeout(function(){a(g.f,true)},0);else{if(g.c)g.callback=function(y){gadgets.rpc.call(g.f,"__cb",null,g.c,y)};if(n){var u=e(n);g.origin=n;var s=g.r;if(!s||e(s)!=u)s=n;g[t]=s}u=(p[g.s]||
p[""]).apply(g,g.a);g.c&&typeof u!=="undefined"&&gadgets.rpc.call(g.f,"__cb",null,g.c,u)}}}function e(g){if(!g)return"";g=g.toLowerCase();if(g.indexOf("//")==0)g=window.location.protocol+g;if(g.indexOf("://")==-1)g=window.location.protocol+"//"+g;var n=g.substring(g.indexOf("://")+3),u=n.indexOf("/");if(u!=-1)n=n.substring(0,u);g=g.substring(0,g.indexOf("://"));u="";var s=n.indexOf(":");if(s!=-1){var y=n.substring(s+1);n=n.substring(0,s);if(g==="http"&&y!=="80"||g==="https"&&y!=="443")u=":"+y}return g+
"://"+n+u}function f(g){if(g.charAt(0)=="/"){var n=g.indexOf("|"),u=n>0?g.substring(1,n):g.substring(1);g=n>0?g.substring(n+1):null;return{id:u,origin:g}}else return null}function i(g){if(typeof g==="undefined"||g==="..")return window.parent;var n=f(g);if(n)return window.top.frames[n.id];g=String(g);if(n=window.frames[g])return n;if((n=document.getElementById(g))&&n.contentWindow)return n.contentWindow;return null}function h(g,n){if(B[g]!==true){if(typeof B[g]==="undefined")B[g]=0;var u=i(g);if(g===
".."||u!=null)if(E.setup(g,n)===true){B[g]=true;return}if(B[g]!==true&&B[g]++<10)window.setTimeout(function(){h(g,n)},500);else{H[g]=J;B[g]=true}}}function k(g){if((g=z[g])&&g.substring(0,1)==="/")g=g.substring(1,2)==="/"?document.location.protocol+g:document.location.protocol+"//"+document.location.host+g;return g}function j(g,n,u){if(!/http(s)?:\/\/.+/.test(n))if(n.indexOf("//")==0)n=window.location.protocol+n;else if(n.charAt(0)=="/")n=window.location.protocol+"//"+window.location.host+n;else if(n.indexOf("://")==
-1)n=window.location.protocol+"//"+n;z[g]=n;if(typeof u!=="undefined")x[g]=!!u}function m(g,n){n=n||"";A[g]=String(n);h(g,n)}function l(g){g=(g.passReferrer||"").split(":",2);L=g[0]||"none";N=g[1]||"origin"}function o(g){if(String(g.useLegacyProtocol)==="true"){E=gadgets.rpctx.ifpc;E.init(d,a)}}function r(g,n){function u(s){s=s?s.rpc:{};l(s);var y=s.parentRelayUrl||"";y=e(G.parent||n)+y;j("..",y,String(s.useLegacyProtocol)==="true");o(s);m("..",g)}!G.parent&&n?u({}):gadgets.config.register("rpc",
null,u)}function q(g,n,u){if(g==="..")r(u||G.rpctoken||G.ifpctok||"",n);else a:{var s=null;if(g.charAt(0)!="/"){if(!gadgets.util)break a;s=document.getElementById(g);if(!s)throw Error("Cannot set up gadgets.rpc receiver with ID: "+g+", element not found.");}s=s&&s.src;n=n||gadgets.rpc.getOrigin(s);j(g,n);n=gadgets.util.getUrlParameters(s);m(g,u||n.rpctoken)}}var t="referer",p={},z={},x={},A={},v=0,C={},B={},D={},G={},H={},I={},L=null,N=null,U=window.top!==window.self,O=window.name,K=function(){},
S=1,M=2,P=window.console,T=P&&P.log&&function(g){P.log(g)}||function(){},J=function(){function g(n){return function(){T(n+": call ignored")}}return{getCode:function(){return"noop"},isParentVerifiable:function(){return true},init:g("init"),setup:g("setup"),call:g("call")}}();if(gadgets.util)G=gadgets.util.getUrlParameters();var Q=false,R=false,E=function(){if(G.rpctx=="flash")return gadgets.rpctx.flash;if(G.rpctx=="rmr")return gadgets.rpctx.rmr;return typeof window.postMessage==="function"?gadgets.rpctx.wpm:
typeof window.postMessage==="object"?gadgets.rpctx.wpm:window.ActiveXObject?gadgets.rpctx.flash?gadgets.rpctx.flash:gadgets.rpctx.nix:navigator.userAgent.indexOf("WebKit")>0?gadgets.rpctx.rmr:navigator.product==="Gecko"?gadgets.rpctx.frameElement:gadgets.rpctx.ifpc}();p[""]=function(){T("Unknown RPC service: "+this.s)};p.__cb=function(g,n){var u=C[g];if(u){delete C[g];u.call(this,n)}};return{config:function(g){if(typeof g.securityCallback==="function")K=g.securityCallback},register:function(g,n){if(g===
"__cb"||g==="__ack")throw Error("Cannot overwrite callback/ack service");if(g==="")throw Error("Cannot overwrite default service: use registerDefault");p[g]=n},unregister:function(g){if(g==="__cb"||g==="__ack")throw Error("Cannot delete callback/ack service");if(g==="")throw Error("Cannot delete default service: use unregisterDefault");delete p[g]},registerDefault:function(g){p[""]=g},unregisterDefault:function(){delete p[""]},forceParentVerifiable:function(){if(!E.isParentVerifiable())E=gadgets.rpctx.ifpc},
call:function(g,n,u){g=g||"..";var s="..";if(g==="..")s=O;else if(g.charAt(0)=="/"){s=gadgets.rpc.getOrigin(window.location.href);s="/"+O+(s?"|"+s:"")}++v;if(u)C[v]=u;var y={s:n,f:s,c:u?v:0,a:Array.prototype.slice.call(arguments,3),t:A[g],l:!!x[g]},w;a:if(L==="bidir"||L==="c2p"&&g===".."||L==="p2c"&&g!==".."){w=window.location.href;var F="?";if(N==="query")F="#";else if(N==="hash"){w=w;break a}F=w.lastIndexOf(F);F=F===-1?w.length:F;w=w.substring(0,F)}else w=null;if(w)y.r=w;if(!(g!==".."&&f(g)==null&&
!document.getElementById(g))){a:{w=g;if(typeof D[w]==="undefined"){D[w]=false;F=k(w);if(e(F)!==e(window.location.href)){w=false;break a}F=i(w);try{D[w]=F.gadgets.rpc.receiveSameDomain}catch(V){}}if(typeof D[w]==="function"){D[w](y);w=true}else w=false}if(!w){w=H[g];if(!w&&f(g)!==null)w=E;if(w){if(x[g])w=gadgets.rpctx.ifpc;if(w.call(g,s,y)===false){H[g]=J;E.call(g,s,y)}}else if(I[g])I[g].push(y);else I[g]=[y]}}},getRelayUrl:k,setRelayUrl:j,setAuthToken:m,setupReceiver:q,getAuthToken:function(g){return A[g]},
removeReceiver:function(g){delete z[g];delete x[g];delete A[g];delete B[g];delete D[g];delete H[g]},getRelayChannel:function(){return E.getCode()},receive:function(g,n){g.length>4?E._receiveMessage(g,d):c.apply(null,g.concat(n))},receiveSameDomain:function(g){g.a=Array.prototype.slice.call(g.a);window.setTimeout(function(){d(g)},0)},getOrigin:e,getTargetOrigin:function(g){var n=null;if(n=k(g))n=n;else n=(n=f(g))?n.origin:g==".."?G.parent:document.getElementById(g).src;return e(n)},init:function(){if(E.init(d,
a)===false)E=J;U?q(".."):gadgets.config.register("rpc",null,function(g){g=g.rpc||{};l(g);o(g)})},_getTargetWin:i,_parseSiblingId:f,ACK:"__ack",RPC_ID:O||"..",SEC_ERROR_LOAD_TIMEOUT:0,SEC_ERROR_FRAME_PHISH:S,SEC_ERROR_FORGED_MSG:M}}();gadgets.rpc.init()};gadgets.views=function(){function a(f){if(!f)f=window.event;var i;if(f.target)i=f.target;else if(f.srcElement)i=f.srcElement;if(i.nodeType===3)i=i.parentNode;if(i.nodeName.toLowerCase()==="a")if((i=i.getAttribute("href"))&&i[0]!=="#"&&i.indexOf("://")===-1){gadgets.views.requestNavigateTo(c,i);f.stopPropagation&&f.stopPropagation();f.preventDefault&&f.preventDefault();f.returnValue=false;f.cancelBubble=true;return false}return false}var b={},c=null,d={},e={};gadgets.config.register("views",null,function(f){f=
f.views||{};for(var i in f)if(f.hasOwnProperty(i))if(i!="rewriteLinks"){var h=f[i],k=i.toUpperCase();b[k]=k;if(h){d[i]=new gadgets.views.View(i,h.isOnlyVisible);k=h.aliases||[];for(var j=0,m;m=k[j];++j)d[m]=new gadgets.views.View(i,h.isOnlyVisible)}}i=gadgets.util.getUrlParameters();if(i["view-params"]){e=gadgets.json.parse(decodeURIComponent(i["view-params"]))||e;e.hasOwnProperty("app_id")&&delete e.app_id}c=d[i.view]||d["default"];f.rewriteLinks&&gadgets.util.attachBrowserEvent(document,"click",
a,false)});return{bind:function(f,i){function h(v,C){return i.hasOwnProperty(v)?i[v]:C}function k(v){if(!(p=v.match(m)))throw Error("Invalid variable : "+v);}function j(v,C,B){var D=v.split(",");for(v=0;v<D.length;++v){k(D[v]);if(B(C,h(p[1]),p[1]))break}return C}if(typeof f!=="string")throw Error("Invalid urlTemplate");if(typeof i!=="object")throw Error("Invalid environment");for(var m=/^([a-zA-Z0-9][a-zA-Z0-9_\.\-]*)(=([a-zA-Z0-9\-\._~]|(%[0-9a-fA-F]{2}))*)?$/,l=RegExp("\\{([^}]*)\\}","g"),o=/^-([a-zA-Z]+)\|([^|]*)\|(.+)$/,
r=[],q=0,t,p,z,x,A;t=l.exec(f);){r.push(f.substring(q,t.index));q=l.lastIndex;if(p=t[1].match(m)){t=p[1];z=p[2]?p[2].substr(1):"";r.push(h(t,z))}else if(p=t[1].match(o)){x=p[1];t=p[2];A=p[3];z=0;switch(x){case "neg":z=1;case "opt":j(A,{flag:z},function(v,C){var B;if(B=typeof C!=="undefined"){a:if(typeof C==="object"||typeof C==="function"){for(var D in C)if(C.hasOwnProperty(D)){B=false;break a}B=true}else B=false;B=!B}if(B){v.flag=!v.flag;return 1}return 0}).flag&&r.push(t);break;case "join":r.push(j(A,
[],function(v,C,B){if(typeof C==="string")v.push(B+"="+C);else if(typeof C==="object")for(var D in C)C.hasOwnProperty(D)&&v.push(D+"="+C[D])}).join(t));break;case "list":k(A);x=h(p[1]);typeof x==="object"&&typeof x.join==="function"&&r.push(x.join(t));break;case "prefix":z=1;case "suffix":k(A);x=h(p[1],p[2]&&p[2].substr(1));if(typeof x==="string")r.push(z?t+x:x+t);else if(typeof x==="object"&&typeof x.join==="function")r.push(z?t+x.join(t):x.join(t)+t);break;default:throw Error("Invalid operator : "+
x);}}else throw Error("Invalid syntax : "+t[0]);}r.push(f.substr(q));return r.join("")},requestNavigateTo:function(f,i,h){if(typeof f!=="string")f=f.getName();gadgets.rpc.call(null,"requestNavigateTo",null,f,i,h)},getCurrentView:function(){return c},getSupportedViews:function(){return d},getParams:function(){return e},ViewType:b}}();gadgets.views.View=function(a,b){this.name_=a;this.isOnlyVisible_=!!b};gadgets.views.View.prototype.getName=function(){return this.name_};
gadgets.views.View.prototype.getUrlTemplate=function(){return gadgets.config&&gadgets.config.views&&gadgets.config.views[this.name_]&&gadgets.config.views[this.name_].urlTemplate};gadgets.views.View.prototype.bind=function(a){return gadgets.views.bind(this.getUrlTemplate(),a)};gadgets.views.View.prototype.isOnlyVisibleGadget=function(){return this.isOnlyVisible_};LJAPP_IPPU=new Class(IPPU,{init:function(a){a||(a="");LJAPP_IPPU.superClass.init.apply(this,[]);this.uniqId=this.generateUniqId();this.setTitle(a);this.setTitlebar(true);this.setTitlebarClass("lj_ippu_titlebar");this.addClass("lj_ippu lj_ippu_app");this.setAutoCenterCallback(IPPU.center);this.setDimensions(514,"auto");this.setFixedPosition(true);this.setOverlayVisible(false);this.setModal(true)},setTitle:function(a){LJAPP_IPPU.superClass.setTitle.apply(this,["<div class='ljappippu_button' id='"+this.uniqId+
"_cancel'></div>"+a]);this.setup_lj_ippu()},updateTitlebar:function(){if(this.showTitlebar&&this.titlebar&&this.title!=this.titlebar.innerHTML){this.titlebar.innerHTML=this.title;this.setup_lj_ippu()}},generateUniqId:function(){var a=new Date;return"lj_ippu_"+a.getHours()+a.getMinutes()+a.getMilliseconds()},show:function(){LJAPP_IPPU.superClass.show.apply(this)},setup_lj_ippu:function(){var a=this.cancel.bind(this);jQuery(this.ele).find("#"+this.uniqId+"_cancel").click(a)},hide:function(){clearInterval(this.timerSetup);
LJAPP_IPPU.superClass.hide.apply(this)}});LJAppWidget=new Class(Object,{init:function(a,b){var c=a.title,d=a.authToken;this.templateID=a.templateID||"";this.finishCallback=a.finishCallback||null;this.widgetName=a.widgetName||"LJAppwidget";b||(b={});this.reqParams=b;var e=new LJAPP_IPPU(c);this.ippu=e;this.widgetId="LJAppWidget_"+Unique.id();var f=document.createElement("div");f.id=this.widgetId;this.widgetNode=f;e.setContentElement(f);e.setModal(true);e.setOverlayVisible(true);e.setClickToClose(false);e.setDimensions("60%","auto");e.setAutoCenter(true,
true);var i=this;this.ippu.setCancelledCallback(function(){i.cancel()});this.cancelOnEscape();a.center&&e.center();this.authToken=d;this.title=c;this.loaded=false;return this},getWidget:function(){return this.widgetNode},loadContent:function(a){var b=this;a=a||"request";this.makeRequest(a,function(c){b.contentLoaded(c)})},submitData:function(a,b){var c=this;a=a||"set";b=b||null;this.makeRequest(a,function(d){c.onData(d)},b)},makeRequest:function(a,b,c){if(!c)c=this.reqParams;c=jQuery.extend({},c);
c.auth_token=this.authToken;c.action=a;url="/__rpc_ljapp_"+this.widgetName;var d=this;jQuery.post(url,c,function(e){e.status==="ERROR"?d.onError(e):b(e)},"json")},cancelOnEscape:function(){var a=this;jQuery(window).add(document).keydown(function(b){b.keyCode===27&&a.ippu.visible()&&a.cancel()})},cancel:function(){this.onError({code:"canceled"});this.close()},onData:function(a){this.onReturn("OK",a)},onError:function(a){this.onReturn("ERROR",a)},onReturn:function(a,b,c){c=c||false;b=b||{};b.status=
a;this.finishCallback&&this.finishCallback(b);c&&this.close()},contentLoaded:function(a){a=a||{};a.messages=a.messages||{};if("auth_token"in a)this.authToken=a.auth_token;var b=jQuery.tmpl(jQuery("#"+this.templateID),a);jQuery(this.getWidget()).empty().append(b);this.loaded=true;this.ippu.center();"title"in a.messages&&this.ippu.setTitle(a.messages.title);this.bindControls();this.ippu.show();this.verifyFocus()},verifyFocus:function(){jQuery("<input>").css({position:"fixed",left:"-30000em",top:"0em"}).appendTo(jQuery(document.body)).focus().remove()},
bindControls:function(){},close:function(){this.ippu.hide()}});LJAppWidget_RequestPermission=new Class(LJAppWidget,{init:function(a){a.templateID="ljappippu_confirm";a.widgetName="permissions";LJAppWidget_RequestPermission.superClass.init.apply(this,arguments)},bindControls:function(){var a=jQuery(this.getWidget()),b=this;a.find("input.ljappippu_confirm_ok").click(function(){b.submitData()});a.find("input.ljappippu_confirm_reject").click(function(){b.cancel()});LJAppWidget_RequestPermission.superClass.bindControls.apply(this)},onData:function(a){this.onReturn("OK",
a,true)},contentLoaded:function(a){a=a||{};this.reqParams.permissions=a.permissions.join(",");LJAppWidget_RequestPermission.superClass.contentLoaded.call(this,a)}});(function(a){LJAppWidget_RequestShareApp=new Class(LJAppWidget,{init:function(b,c){b.templateID="ljappippu_share";b.widgetName="share_app";this.extra=c.extra;delete c.extra;LJAppWidget_RequestShareApp.superClass.init.apply(this,arguments);this.friends={};this.selectedCount=0;this.cachedData={}},initRecipientsList:function(b){var c=this,d=a(".ljappippu_share_selected").itemList({hoverClass:"ljappippu_share_selected_hover",onNewElement:function(f){return jQuery("#ljappippu_share_person").tmpl({username:f,
hasCloseButton:true})},onSelect:function(f){var i=f.data;d.itemList("remove",i).itemList("updateLast");if(i in c.friends){c.selectedCount--;c.friends[i]=0;c.updateSendButton()}b&&b(i);f.preventDefault();f.stopPropagation()}});this.selectedCount=0;for(var e in this.friends)if(this.friends[e].selected){d.itemList("add",e);this.selectedCount++}d.itemList("updateLast");this.updateSendButton();return d},setupFirstStage:function(b){var c=jQuery("#ljappippu_share_choose").tmpl(b),d=this.getWidget(),e=this;
jQuery(d).find(".ljappippu_share_content").empty().append(c);d.className="firstStage";recipientsSelector.init({perPage:0,friends:b.friends,onSelect:function(j){f.itemList("add",j.username).itemList("updateLast");if(j.username in e.friends){e.friends[j.username].selected=1;e.selectedCount++;e.updateSendButton()}}});jQuery("#filter").placeholder().input(function(){recipientsSelector.filter(this.value)});var f=this.initRecipientsList(function(j){recipientsSelector.add(j)}),i=false;jQuery("#ljappippu_share_message").keypress(function(j){i&&
j.preventDefault();var m=this;setTimeout(function(){if(m.value.length>120){m.value=m.value.substring(0,120);i=true;setTimeout(function(){i=false},300)}},0)});jQuery(".ljappippu_share_send").click(function(j){e.sendInvitations();j.preventDefault()});var h=jQuery("#ljappippu_share_message").labeledPlaceholder(),k=jQuery("#ljappippu_share_message").height()+"px";h.css({height:"1.5em"}).focus(function(){h.stop().animate({height:k},200)}).blur(function(){this.value.length===0&&h.stop().animate({height:"1.5em"},
200)});this.ippu.center()},updateSendButton:function(){jQuery(".ljappippu_share_send").attr("disabled",this.selectedCount===0)},setupSecondStage:function(){var b=jQuery("#ljappippu_share_invite").tmpl(),c=this.getWidget();jQuery(c).find(".ljappippu_share_content").empty().append(b);c.className="secondStage";this.ippu.center();var d=this;setTimeout(function(){d.close()},3E3)},sendInvitations:function(){var b=jQuery("#ljappippu_share_message").val()||"",c=[],d;for(d in this.friends)this.friends[d].selected&&
c.push(this.friends[d].userid);b={message:b,recipients:c.join(",")};if(this.extra.length>0)b.extra=this.extra;this.submitData("send",jQuery.extend({},this.reqParams,b))},onData:function(b){this.setupSecondStage();this.onReturn("OK",b,false)},loadContent:function(){LJAppWidget_RequestShareApp.superClass.loadContent.call(this,"select")},contentLoaded:function(b){b=b||{};b.messages=b.messages||{};b.messages.title=b.messages.header;this.cachedData=b;LJAppWidget_RequestShareApp.superClass.contentLoaded.call(this,
b);this.friends={};for(var c=0;c<b.friends.length;++c)this.friends[b.friends[c].display_name]=b.friends[c];b.messages.isEmptyList=b.friends.length===0;this.setupFirstStage(b)}})})(jQuery,window);(function(a){LJAppWidget_RequestPayment=new Class(LJAppWidget,{init:function(b){b.templateID="ljappippu_payment";b.widgetName="payments";this.payment=b.payment;this.balance=0;this.paymentMade=false;this.onSubmitPayment=b.onSubmitPayment||null;"stoken"in this.payment&&delete this.payment.stoken;LJAppWidget_RequestPayment.superClass.init.apply(this,arguments)},bindControls:function(){var b=this;jQuery(this.getWidget()).delegate(".ljappippu_payment_ok","click",function(){b.onSubmitPayment&&b.onSubmitPayment(+new Date);
var c=a.extend({},b.reqParams,{payment:gadgets.json.stringify(b.payment)});b.submitData("pay",c)}).delegate(".ljappippu_payment_reject","click",function(){b.cancel()}).delegate(".ljappippu_payment_add","click",function(){var c=window.open(Site.siteroot+"/shop/tokens.bml");b.checkIfClosed(c)});LJAppWidget_RequestPayment.superClass.bindControls.apply(this)},checkIfClosed:function(b){var c=this,d=false;try{d=b.closed}catch(e){d=true}d?this.refreshDialog():setTimeout(function(){c.checkIfClosed(b)},100)},
refreshDialog:function(){this.loadContent("balance")},loadContent:function(b){if(this.isCorrectPayment()){this.paymentMade=false;LJAppWidget_RequestPayment.superClass.loadContent.call(this,b)}else{gadgets.log("malformed payment");this.onReturn("MALFORMED_REQUEST")}},contentLoaded:function(b){b=b||{};this.balance=parseInt(b.balance,10);a.extend(b,{balance:this.balance,payment:this.payment});LJAppWidget_RequestPayment.superClass.contentLoaded.call(this,b)},onData:function(b){var c=jQuery("#ljappippu_payment_result").tmpl({hasErrors:b.responseCode!==
"OK",isDelivered:b.state==="delivered"}),d=this.getWidget();jQuery(d).find(".ljappippu_inner").empty().append(c);this.ippu.center();this.paymentMade=true;if(b.responseCode==="OK"){var e=this;setTimeout(function(){e.close()},3E3)}this.onReturn("OK",b,false)},isCorrectPayment:function(){if(!("amount"in this.payment))return false;for(var b=this.payment.amount,c=0;c<this.payment.items.length;++c)b-=this.payment.items[c].count*this.payment.items[c].price;return Math.floor(b)===0},cancel:function(){this.paymentMade||
this.onReturn("USER_CANCELLED",null,true)}})})(jQuery,window);(function(){LJAppWidget_RequestPaymentRecords=new Class(LJAppWidget,{init:function(a){a.templateID="ljappippu_payment_records";a.widgetName="payments";LJAppWidget_RequestPaymentRecords.superClass.init.apply(this,arguments)},contentLoaded:function(a){if(a.payments)for(var b=0;b<a.payments.length;++b)a.payments[b].orderedTimeStr=(new Date(a.payments[b].orderedTime)).toLocaleString();LJAppWidget_RequestPaymentRecords.superClass.contentLoaded.apply(this,arguments)}})})(jQuery,window);LJAppWidget_RequestCreatePost=new Class(LJAppWidget,{init:function(a,b){a.templateID="ljappippu_post_event";a.widgetName="post_event";this.post=this._parsePost(a.post);var c=this.post.journal;if(c)b.journal=c;LJAppWidget_RequestCreatePost.superClass.init.apply(this,arguments)},bindControls:function(){var a=this;jQuery(this.getWidget()).find("input.ljappippu_createpost_ok").click(function(){var b=jQuery.extend({},a.reqParams,a.post);b.also_my_journal=jQuery(".ljappippu_event_alsoinmy").prop("checked")?
"1":"0";a.submitData("post",b)});LJAppWidget_RequestCreatePost.superClass.bindControls.apply(this)},onData:function(a){this.onReturn("OK",a,true)},refreshDialog:function(){this.loadContent("preview")},contentLoaded:function(a){a=jQuery.extend({},a,this.post);LJAppWidget_RequestCreatePost.superClass.contentLoaded.call(this,a)},_parsePost:function(a){var b=a.tags;b=b&&b.join(", ")||"";return{journal:a.journal||"",subject:a.subject||"",event:a.body||"",taglist:b}}});LJAppWidget_RequestCreateComment=new Class(LJAppWidget,{init:function(a,b){a.templateID="ljappippu_post_comment";a.widgetName="post_comment";this.comment=this._parseComment(a.comment);b=jQuery.extend({},b,this.comment);LJAppWidget_RequestCreateComment.superClass.init.apply(this,arguments)},bindControls:function(){var a=this;jQuery(this.getWidget()).find("input.ljappippu_createcomment_ok").click(function(){a.submitData("post")});LJAppWidget_RequestCreateComment.superClass.bindControls.apply(this)},
onData:function(a){this.onReturn("OK",a,true)},refreshDialog:function(){this.loadContent("preview")},contentLoaded:function(a){a=jQuery.extend({},a,this.comment);LJAppWidget_RequestCreatePost.superClass.contentLoaded.call(this,a)},_parseComment:function(a){return{journal:a.journal||"",subject:a.subject||"",comment:a.body||"",ditemid:a.ditemid||"",dtalkid:a.dtalkid||""}}});LJAppWidget_OpenGadget=new Class(LJAppWidget,{init:function(a){a.templateID="ljappippu_open_gadget";a.widgetName="open_gadget";LJAppWidget_OpenGadget.superClass.init.apply(this,arguments);this.dialogId=a.dialogId},onData:function(a){this.onReturn("OK",a,true)},close:function(){LJAppWidget_OpenGadget.superClass.close.apply(this,arguments)},cancel:function(){shindig.container.gadgetService.close(this.dialogId)},contentLoaded:function(a){LJAppWidget_OpenGadget.superClass.contentLoaded.apply(this,arguments);
var b=this._iframe=jQuery(a.element),c=jQuery(this.getWidget());this.frameId=b.prop("id");c.append(b);this.setHeight();shindig.container.createGadget(b,"popup",this);b=shindig.container.gadgetService.getGadgetIdFromModuleId(b.prop("id"));c=shindig.container.getGadget(b);c.dialog_id=this.dialogId;c.frame_id=b},setHeight:function(a){if(a&&a>=300){a=a>=300?a:300;this._iframe.height(a);a=a}else a=this._iframe.height();var b=100,c=this._iframe.width();jQuery(this.getWidget());var d=jQuery(window).height();
b=100;a>d-b&&this._iframe.height(d-b);this.ippu.setDimensions(c,"auto");this.ippu.center()},setWidth:function(){},setTitle:function(a){this.ippu.setTitle(a)},refreshDialog:function(){this.loadContent("preview")}});var opensocial=opensocial||{};opensocial.requestShareApp=function(a,b,c,d){opensocial.Container.get().requestShareApp(a,b,c,d)};opensocial.hasPermission=function(a){return opensocial.Container.get().hasPermission(a)};opensocial.requestPermission=function(a,b,c){opensocial.Container.get().requestPermission(a,b,c)};opensocial.EscapeType={HTML_ESCAPE:"htmlEscape",NONE:"none"};
Function.prototype.inherits=function(a){function b(){}this.superClass_=b.prototype=a.prototype;this.prototype=new b;this.prototype.constructor=this};opensocial.Container=function(){};opensocial.Container.container_=null;opensocial.Container.setContainer=function(a){opensocial.Container.container_=a};opensocial.Container.get=function(){return opensocial.Container.container_};opensocial.Container.prototype.requestShareApp=function(a,b,c){c&&window.setTimeout(function(){c(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.NOT_IMPLEMENTED,null))},0)};opensocial.Container.prototype.hasPermission=function(){return false};
opensocial.Container.prototype.requestPermission=function(a,b,c){c&&window.setTimeout(function(){c(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.NOT_IMPLEMENTED,null))},0)};opensocial.Container.isArray=function(a){return a instanceof Array};opensocial.Container.getField=function(a,b,c){return opensocial.Container.escape(a[b],c,false)};
opensocial.Container.escape=function(a,b,c){return b&&b[opensocial.DataRequest.DataRequestFields.ESCAPE_TYPE]==opensocial.EscapeType.NONE?a:gadgets.util.escape(a,c)};opensocial.ResponseItem=function(a,b,c,d){this.originalDataRequest_=a;this.data_=b;this.errorCode_=c;this.errorMessage_=d};opensocial.ResponseItem.prototype.hadError=function(){return!!this.errorCode_};opensocial.ResponseItem.Error={NOT_IMPLEMENTED:"notImplemented",UNAUTHORIZED:"unauthorized",FORBIDDEN:"forbidden",BAD_REQUEST:"badRequest",INTERNAL_ERROR:"internalError",LIMIT_EXCEEDED:"limitExceeded",CANCELED:"canceled"};opensocial.ResponseItem.prototype.getErrorCode=function(){return this.errorCode_};
opensocial.ResponseItem.prototype.getErrorMessage=function(){return this.errorMessage_};opensocial.ResponseItem.prototype.getOriginalDataRequest=function(){return this.originalDataRequest_};opensocial.ResponseItem.prototype.getData=function(){return this.data_};opensocial.BillingItem=function(a){this.fields_=a||{};this.fields_[opensocial.BillingItem.Field.COUNT]=this.fields_[opensocial.BillingItem.Field.COUNT]||1};opensocial.BillingItem.Field={SKU_ID:"skuId",PRICE:"price",COUNT:"count",DESCRIPTION:"description",IMAGE_URL:"imageUrl",IMAGE_WIDTH:"imageWidth",IMAGE_HEIGHT:"imageHeight"};opensocial.BillingItem.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)};
opensocial.BillingItem.prototype.setField=function(a,b){return this.fields_[a]=b};opensocial.Payment=function(a){this.fields_=a||{};this.fields_[opensocial.Payment.Field.PAYMENT_TYPE]=this.fields_[opensocial.Payment.Field.PAYMENT_TYPE]||opensocial.Payment.PaymentType.PAYMENT};opensocial.Payment.prototype.isPayment=function(){return this.fields_[opensocial.Payment.Field.PAYMENT_TYPE]==opensocial.Payment.PaymentType.PAYMENT};opensocial.Payment.prototype.isCredit=function(){return this.fields_[opensocial.Payment.Field.PAYMENT_TYPE]==opensocial.Payment.PaymentType.CREDIT};
opensocial.Payment.prototype.isComplete=function(){return!!this.fields_[opensocial.Payment.Field.PAYMENT_COMPLETE]};opensocial.Payment.Field={SANDBOX:"sandbox",ITEMS:"items",AMOUNT:"amount",MESSAGE:"message",PARAMETERS:"parameters",PAYMENT_TYPE:"paymentType",ORDER_ID:"orderId",ORDERED_TIME:"orderedTime",SUBMITTED_TIME:"submittedTime",EXECUTED_TIME:"executedTime",RESPONSE_CODE:"responseCode",RESPONSE_MESSAGE:"responseMessage",PAYMENT_COMPLETE:"paymentComplete"};
opensocial.Payment.prototype.getField=function(a,b){return opensocial.Container.getField(this.fields_,a,b)};opensocial.Payment.prototype.setField=function(a,b){return this.fields_[a]=b};opensocial.Payment.PaymentType={PAYMENT:"payment",CREDIT:"credit"};
opensocial.Payment.ResponseCode={APP_LOGIC_ERROR:"appLogicError",APP_NETWORK_FAILURE:"appNetworkFailure",INSUFFICIENT_MONEY:"insufficientMoney",INVALID_TOKEN:"invalidToken",MALFORMED_REQUEST:"malformedRequest",NOT_IMPLEMENTED:"notImplemented",OK:"ok",PAYMENT_ERROR:"paymentError",PAYMENT_PROCESSOR_ALREADY_OPENED:"paymentProcessorAlreadyOpened",UNKNOWN_ERROR:"unknownError",USER_CANCELLED:"userCancelled"};
opensocial.Payment.RecordsRequestFields={MAX:"max",IS_COMPLETE:"is_complete",START_TIME:"start_time",TYPE:"type"};var JsonPayment=function(a,b){a=a||{};b||JsonPayment.constructArrayObject(a,"items",JsonBillingItem);opensocial.Payment.call(this,a)};JsonPayment.inherits(opensocial.Payment);JsonPayment.prototype.toJsonObject=function(){for(var a=JsonPayment.copyFields(this.fields_),b=a.items||[],c=[],d=0;d<b.length;d++)c[d]=b[d].toJsonObject();a.items=c;return a};var JsonBillingItem=function(a){opensocial.BillingItem.call(this,a)};JsonBillingItem.inherits(opensocial.BillingItem);
JsonBillingItem.prototype.toJsonObject=function(){return JsonPayment.copyFields(this.fields_)};JsonPayment.constructArrayObject=function(a,b,c){if(a=a[b])for(b=0;b<a.length;b++)a[b]=new c(a[b])};JsonPayment.copyFields=function(a){var b={},c;for(c in a)b[c]=a[c];return b};opensocial.requestPayment=function(a,b){opensocial.Container.get().requestPayment(a,b)};opensocial.requestPaymentRecords=function(a,b){opensocial.Container.get().requestPaymentRecords(a,b)};opensocial.newPayment=function(a){return opensocial.Container.get().newPayment(a)};opensocial.newBillingItem=function(a){return opensocial.Container.get().newBillingItem(a)};shindig=shindig||{};
shindig.paymentprocessor=function(){function a(i){var h=null;h={};h.frameId=i;return h}function b(i,h){if(d)h.responseCode="PAYMENT_PROCESSOR_ALREADY_OPENED";if(!h.amount||h.amount<=0)h.responseCode="MALFORMED_REQUEST";f.paymentOpen||(h.responseCode="NOT_IMPLEMENTED");e=a(this.f);if("stoken"in h)e.stoken=h.stoken;if(e==null)h.responseCode="NOT_IMPLEMENTED";if(h.responseCode&&h.responseCode!="OK")try{gadgets.rpc.call(this.f,"shindig.requestPayment_callback",null,i,h)}finally{return}d=true;h.orderedTime=
(new Date).getTime();h.message=gadgets.util.escapeString(h.message);e.callbackId=i;e.payment=h;f.paymentOpen()}function c(i,h){var k={payments:{}};if(d)k.responseCode="PAYMENT_PROCESSOR_ALREADY_OPENED";f.paymentRecordsOpen||(k.responseCode="NOT_IMPLEMENTED");if(k.responseCode&&k.responseCode!="OK")try{gadgets.rpc.call(this.f,"shindig.requestPaymentRecords_callback",null,i,k)}finally{return}d=true;e=a(this.f);e.callbackId=i;e.records=k;e.reqParams=h;f.paymentRecordsOpen()}var d=false,e=null,f={};return{initPayment:function(i,
h){f.paymentOpen=i;f.paymentClose=h;gadgets.rpc.register("shindig.requestPayment",b)},initPaymentRecords:function(i,h){f.paymentRecordsOpen=i;f.paymentRecordsClose=h;gadgets.rpc.register("shindig.requestPaymentRecords",c)},openPayment:b,closePayment:function(){if(d){f.paymentClose&&f.paymentClose();try{gadgets.rpc.call(e.frameId,"shindig.requestPayment_callback",null,e.callbackId,e.payment)}catch(i){}finally{d=false;e=null}}},openPaymentRecords:c,closePaymentRecords:function(){if(d){f.paymentRecordsClose&&
f.paymentRecordsClose();try{gadgets.rpc.call(e.frameId,"shindig.requestPaymentRecords_callback",null,e.callbackId,e.records)}finally{d=false;e=null}}},getParam:function(i){if(!i)return null;var h=null;try{var k=i.split(".");if(k.length>0){i=e;for(var j=0;j<k.length;j++)i=i[k[j]];h=i}}catch(m){h=null}return h},setParam:function(i,h){if(i){var k=i.split(".");if(k.length>1){for(var j=e,m=0;m<k.length-1;m++)j=j[k[m]];j[k[k.length-1]]=h}}}}}();var paymentProcessor=function(){function a(){var i=e.getParam("frameId");i=shindig.container.gadgetService.getGadgetIdFromModuleId(i);return shindig.container.getGadget(i)}function b(){var i=e.getParam("payment.stoken"),h=a();e.setParam("payment.stoken",null);f=new LJAppWidget_RequestPayment({title:paymentProcessor.requestPaymentTitle,finishCallback:c,payment:e.getParam("payment"),onSubmitPayment:function(k){e.setParam("payment.submittedTime",k)},authToken:h.auth_token},{app_id:h.app_id,st:i});f.loadContent("balance")}
function c(i){var h=i.responseCode||i.status;e.setParam("payment.responseCode",h);e.setParam("payment.responseMessage",i.responseMessage);if(h=="OK"){e.setParam("payment.paymentComplete",i.state==="delivered");e.setParam("payment.executedTime",i.executedTime);e.setParam("payment.orderId",i.orderId);LiveJournal.run_hook("update_wallet_balance")}e.closePayment()}function d(){var i=e.getParam("reqParams.stoken"),h=a();e.setParam("reqParams.stoken",null);f=new LJAppWidget_RequestPaymentRecords({title:paymentProcessor.requestPaymentRecordsTitle,
finishCallback:function(){e.closePaymentRecords()},authToken:h.auth_token},{app_id:h.app_id,st:i,payment:gadgets.json.stringify(e.getParam("reqParams.payment")),type:e.getParam("reqParams.type"),max:e.getParam("reqParams.max"),start_time:e.getParam("reqParams.start_time"),is_complete:e.getParam("reqParams.is_complete")});f.loadContent("history")}var e,f;return{init:function(){e=shindig.paymentprocessor;e.initPayment(b);e.initPaymentRecords(d)}}}();paymentProcessor.init();(function(){osapi.newBatch=function(a){var b={},c=[],d=a||null,e=function(f){var i={method:f.request.method,id:f.key};if(f.request.rpc)i.params=f.request.rpc;return i};b.execute=function(f){for(var i={},h={},k=0,j=[],m=0;m<c.length;m++){var l=c[m].request.transport;if(!h[l.name]){j.push(l);k++}h[l.name]=h[l.name]||[];h[l.name].push(e(c[m]))}m=function(o){if(o.error)i.error=o.error;for(var r=0;r<c.length;r++){var q=c[r].key,t=o[q];if(t)i[q]=t.error?t:t.data||t.result}k--;k===0&&f(i)};for(l=0;l<j.length;l++)j[l].execute(h[j[l].name],
m,d);k==0&&window.setTimeout(function(){f(i)},0)};b.add=function(f,i){i&&f&&c.push({key:f,request:i});return b};return b}})();osapi._registerMethod=function(a,b){if(a!=="newBatch"){for(var c=a.split("."),d=osapi,e=0;e<c.length-1;e++){d[c[e]]=d[c[e]]||{};d=d[c[e]]}var f=c[c.length-1],i;if(d[f])i=d[f];d[f]=function(h,k,j){h=h||{};h.userId=h.userId||"@viewer";h.groupId=h.groupId||"@self";if(osapi.container){h=new osapi._BoundCall(a,b,h,j);h.execute(k)}else return h=new osapi._BoundCall(a,b,h)};if(typeof tamings___!=="undefined"){c=function(){caja___.markTameAsFunction(d[f],a)};if(i&&i.__taming_index){d[f].__taming_index=i.__taming_index;
tamings___[i.__taming_index]=c}else{d[f].__taming_index=tamings___.length;tamings___.push(c)}}}};osapi._BoundCall=function(a,b,c,d){this.method=a;this.transport=b;this.rpc=c;this.token=d};osapi._BoundCall.prototype.execute=function(a){var b=typeof caja___!=="undefined"&&caja___.getUseless&&caja___.getUseless(),c=b?caja___.getUseless():this,d=b?caja___.untame(a):a;a=osapi.newBatch(this.token);a.add(this.method,this);a.execute(function(e){e.error?d.call(c,e.error):d.call(c,e[c.method])})};(function(){function a(d,e,f){d={POST_DATA:gadgets.json.stringify(d),CONTENT_TYPE:"JSON",METHOD:"POST",AUTHORIZATION:"SIGNED"};var i={"Content-Type":"application/json"},h=this.name;if(f)if(c)i.Authorization="OAuth2 "+f;else{h+="?st=";h+=encodeURIComponent(f)}gadgets.io.makeNonProxiedRequest(h,function(k){if(k.errors[0])e({error:{code:k.rc,message:k.text}});else{k=k.result||k.data;if(k.error)e(k);else{for(var j={},m=0;m<k.length;m++)j[k[m].id]=k[m];e(j)}}},d,i)}function b(d){var e=d["osapi.services"];
c=d["osapi.useOAuth2"];if(e)for(var f in e)if(e.hasOwnProperty(f))if(f.indexOf("http")==0||f.indexOf("//")==0){d={name:f.replace("%host%",document.location.host),execute:a};for(var i=e[f],h=0;h<i.length;h++)osapi._registerMethod(i[h],d)}}var c;gadgets.config&&gadgets.config.register("osapi.services",null,b)})();shindig.errors={};shindig.errors.SUBCLASS_RESPONSIBILITY="subclass responsibility";shindig.errors.TO_BE_DONE="to be done";shindig.callAsyncAndJoin=function(a,b,c){for(var d=a.length,e=[],f=0;f<a.length;f++)(function(i){var h=a[i];if(typeof h==="string")h=c[h];h.call(c,function(k){e[i]=k;--d===0&&b(e)})})(f)};shindig.Extensible=function(){};shindig.Extensible.prototype.setDependencies=function(a){for(var b in a)this[b]=a[b]};shindig.Extensible.prototype.getDependencies=function(a){return this[a]};
shindig.UserPrefStore=function(){};shindig.UserPrefStore.prototype.getPrefs=function(){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);};shindig.UserPrefStore.prototype.savePrefs=function(){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);};shindig.DefaultUserPrefStore=function(){shindig.UserPrefStore.call(this)};shindig.DefaultUserPrefStore.inherits(shindig.UserPrefStore);shindig.DefaultUserPrefStore.prototype.getPrefs=function(){};shindig.DefaultUserPrefStore.prototype.savePrefs=function(){};
shindig.GadgetService=function(){};shindig.GadgetService.prototype.setHeight=function(){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);};shindig.GadgetService.prototype.setTitle=function(){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);};shindig.GadgetService.prototype.setUserPref=function(){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);};
shindig.IfrGadgetService=function(){shindig.GadgetService.call(this);gadgets.rpc.register("resize_iframe",this.setHeight);gadgets.rpc.register("set_pref",this.setUserPref);gadgets.rpc.register("set_title",this.setTitle);gadgets.rpc.register("requestNavigateTo",this.requestNavigateTo);gadgets.rpc.register("requestSendMessage",this.requestSendMessage)};shindig.IfrGadgetService.inherits(shindig.GadgetService);
shindig.IfrGadgetService.prototype.setHeight=function(a){if(a>shindig.container.maxheight_)a=shindig.container.maxheight_;var b=document.getElementById(this.f);if(b)b.style.height=a+"px"};shindig.IfrGadgetService.prototype.setTitle=function(a){var b=document.getElementById(this.f+"_title");if(b)b.innerHTML=a.replace(/&/g,"&amp;").replace(/</g,"&lt;")};
shindig.IfrGadgetService.prototype.setUserPref=function(){var a=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);a=shindig.container.getGadget(a);for(var b=1,c=arguments.length;b<c;b+=2)this.userPrefs[arguments[b]].value=arguments[b+1];a.saveUserPrefs()};shindig.IfrGadgetService.prototype.requestSendMessage=function(a,b,c){c&&window.setTimeout(function(){c(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.NOT_IMPLEMENTED,null))},0)};
shindig.IfrGadgetService.prototype.requestNavigateTo=function(a,b){shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);var c=shindig.container.gadgetService.getUrlForView(a);if(b){var d=gadgets.json.stringify(b);if(d.length>0)c+="&appParams="+encodeURIComponent(d)}if(c&&document.location.href.indexOf(c)==-1)document.location.href=c};shindig.IfrGadgetService.prototype.getUrlForView=function(a){return a==="canvas"?"/canvas":a==="profile"?"/profile":null};
shindig.IfrGadgetService.prototype.getGadgetIdFromModuleId=function(a){return parseInt(a.match(/_([0-9]+)$/)[1],10)};shindig.LayoutManager=function(){};shindig.LayoutManager.prototype.getGadgetChrome=function(){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);};shindig.StaticLayoutManager=function(){shindig.LayoutManager.call(this)};shindig.StaticLayoutManager.inherits(shindig.LayoutManager);shindig.StaticLayoutManager.prototype.setGadgetChromeIds=function(a){this.gadgetChromeIds_=a};
shindig.StaticLayoutManager.prototype.getGadgetChrome=function(a){return(a=this.gadgetChromeIds_[a.id])?document.getElementById(a):null};shindig.FloatLeftLayoutManager=function(a){shindig.LayoutManager.call(this);this.layoutRootId_=a};shindig.FloatLeftLayoutManager.inherits(shindig.LayoutManager);
shindig.FloatLeftLayoutManager.prototype.getGadgetChrome=function(){var a=document.getElementById(this.layoutRootId_);if(a){var b=document.createElement("div");b.className="gadgets-gadget-chrome";b.style.cssFloat="left";a.appendChild(b);return b}else return null};shindig.Gadget=function(a){this.userPrefs={};if(a)for(var b in a)if(a.hasOwnProperty(b))this[b]=a[b];if(!this.secureToken)this.secureToken="john.doe:john.doe:appid:cont:url:0:default"};
shindig.Gadget.prototype.setServerBase=function(a){this.serverBase_=a};shindig.Gadget.prototype.getServerBase=function(){return this.serverBase_};shindig.Gadget.prototype.getUserPrefs=function(){return this.userPrefs};shindig.Gadget.prototype.saveUserPrefs=function(){shindig.container.userPrefStore.savePrefs(this)};shindig.Gadget.prototype.getUserPrefValue=function(a){a=this.userPrefs[a];return typeof a.value!="undefined"&&a.value!=null?a.value:a["default"]};
shindig.Gadget.prototype.render=function(a){if(a){var b=this;this.getContent(function(c){a.innerHTML=c;b.finishRender(a)})}};shindig.Gadget.prototype.getContent=function(a){shindig.callAsyncAndJoin(["getTitleBarContent","getUserPrefsDialogContent","getMainContent"],function(b){a(b.join(""))},this)};shindig.Gadget.prototype.getTitleBarContent=function(){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);};
shindig.Gadget.prototype.getUserPrefsDialogContent=function(){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);};shindig.Gadget.prototype.getMainContent=function(){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);};shindig.Gadget.prototype.finishRender=function(){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);};shindig.Gadget.prototype.getAdditionalParams=function(){return""};
shindig.BaseIfrGadget=function(a){shindig.Gadget.call(this,a);if(this.serverBase_){if(this.serverBase_.indexOf("/gadgets")<0)this.serverBase_+="/gadgets/"}else this.serverBase_="/gadgets/";this.queryIfrGadgetType_()};shindig.BaseIfrGadget.inherits(shindig.Gadget);shindig.BaseIfrGadget.prototype.GADGET_IFRAME_PREFIX_="remote_iframe_";shindig.BaseIfrGadget.prototype.CONTAINER="default";shindig.BaseIfrGadget.prototype.cssClassGadget="gadgets-gadget";shindig.BaseIfrGadget.prototype.cssClassTitleBar="gadgets-gadget-title-bar";
shindig.BaseIfrGadget.prototype.cssClassTitle="gadgets-gadget-title";shindig.BaseIfrGadget.prototype.cssClassTitleButtonBar="gadgets-gadget-title-button-bar";shindig.BaseIfrGadget.prototype.cssClassGadgetUserPrefsDialog="gadgets-gadget-user-prefs-dialog";shindig.BaseIfrGadget.prototype.cssClassGadgetUserPrefsDialogActionBar="gadgets-gadget-user-prefs-dialog-action-bar";shindig.BaseIfrGadget.prototype.cssClassTitleButton="gadgets-gadget-title-button";
shindig.BaseIfrGadget.prototype.cssClassGadgetContent="gadgets-gadget-content";shindig.BaseIfrGadget.prototype.rpcToken=2147483647*Math.random()|0;shindig.BaseIfrGadget.prototype.rpcRelay="../container/rpc_relay.html";
shindig.BaseIfrGadget.prototype.getTitleBarContent=function(a){var b=this.hasViewablePrefs_()?'<a href="#" onclick="shindig.container.getGadget('+this.id+').handleOpenUserPrefsDialog();return false;" class="'+this.cssClassTitleButton+'">settings</a> ':"";a('<div id="'+this.cssClassTitleBar+"-"+this.id+'" class="'+this.cssClassTitleBar+'"><span id="'+this.getIframeId()+'_title" class="'+this.cssClassTitle+'">'+(this.title?this.title:"Title")+'</span> | <span class="'+this.cssClassTitleButtonBar+'">'+
b+'<a href="#" onclick="shindig.container.getGadget('+this.id+').handleToggle();return false;" class="'+this.cssClassTitleButton+'">toggle</a></span></div>')};shindig.BaseIfrGadget.prototype.getUserPrefsDialogContent=function(a){a('<div id="'+this.getUserPrefsDialogId()+'" class="'+this.cssClassGadgetUserPrefsDialog+'"></div>')};shindig.BaseIfrGadget.prototype.getMainContent=function(a){var b=this;window.setTimeout(function(){b.getMainContent(a)},0)};
shindig.BaseIfrGadget.prototype.getIframeId=function(){return this.GADGET_IFRAME_PREFIX_+this.id};shindig.BaseIfrGadget.prototype.getUserPrefsDialogId=function(){return this.getIframeId()+"_userPrefsDialog"};shindig.BaseIfrGadget.prototype.getUserPrefsParams=function(){var a="",b;for(b in this.getUserPrefs())a+="&up_"+encodeURIComponent(b)+"="+encodeURIComponent(this.getUserPrefValue(b));return a};
shindig.BaseIfrGadget.prototype.handleToggle=function(){var a=document.getElementById(this.getIframeId());if(a){a=a.parentNode;a.style.display=a.style.display?"":"none"}};shindig.BaseIfrGadget.prototype.hasViewablePrefs_=function(){for(var a in this.getUserPrefs())if(this.userPrefs[a].type!="hidden")return true;return false};
shindig.BaseIfrGadget.prototype.handleOpenUserPrefsDialog=function(){if(this.userPrefsDialogContentLoaded)this.showUserPrefsDialog();else{var a=this;window["ig_callback_"+this.id]=function(c){a.userPrefsDialogContentLoaded=true;a.buildUserPrefsDialog(c);a.showUserPrefsDialog()};var b=document.createElement("script");b.src="http://www.gmodules.com/ig/gadgetsettings?mid="+this.id+"&output=js"+this.getUserPrefsParams()+"&url="+this.specUrl;document.body.appendChild(b)}};
shindig.BaseIfrGadget.prototype.buildUserPrefsDialog=function(a){var b=document.getElementById(this.getUserPrefsDialogId());b.innerHTML=a+'<div class="'+this.cssClassGadgetUserPrefsDialogActionBar+'"><input type="button" value="Save" onclick="shindig.container.getGadget('+this.id+').handleSaveUserPrefs()"> <input type="button" value="Cancel" onclick="shindig.container.getGadget('+this.id+').handleCancelUserPrefs()"></div>';b.childNodes[0].style.display=""};
shindig.BaseIfrGadget.prototype.showUserPrefsDialog=function(a){document.getElementById(this.getUserPrefsDialogId()).style.display=a||a===undefined?"":"none"};shindig.BaseIfrGadget.prototype.hideUserPrefsDialog=function(){this.showUserPrefsDialog(false)};
shindig.BaseIfrGadget.prototype.handleSaveUserPrefs=function(){this.hideUserPrefsDialog();for(var a=document.getElementById("m_"+this.id+"_numfields").value,b=0;b<a;b++){var c=document.getElementById("m_"+this.id+"_"+b);this.userPrefs[c.name.substring(("m_"+this.id+"_up_").length)].value=c.value}this.saveUserPrefs();this.refresh()};shindig.BaseIfrGadget.prototype.handleCancelUserPrefs=function(){this.hideUserPrefsDialog()};
shindig.BaseIfrGadget.prototype.refresh=function(){var a=this.getIframeId();document.getElementById(a).src=this.getIframeUrl(Math.random())};
shindig.BaseIfrGadget.prototype.queryIfrGadgetType_=function(){var a={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify({context:{country:"default",language:"default",view:"default",container:"default"},gadgets:[{url:this.specUrl,moduleId:1}]})};gadgets.io.makeNonProxiedRequest(this.serverBase_+"metadata?st="+this.secureToken,function(c){var d=false;c=c.data.gadgets[0].features;for(var e=0;e<c.length;e++)if(c[e]==="pubsub-2"){d=true;break}d=d?shindig.OAAIfrGadget:shindig.IfrGadget;
for(var f in d)if(d.hasOwnProperty(f))b[f]=d[f]},a,{"Content-Type":"application/javascript"});var b=this};
shindig.IfrGadget={getMainContent:function(a){var b=this.getIframeId();gadgets.rpc.setRelayUrl(b,this.serverBase_+this.rpcRelay);gadgets.rpc.setAuthToken(b,this.rpcToken);a('<div class="'+this.cssClassGadgetContent+'"><iframe id="'+b+'" name="'+b+'" class="'+this.cssClassGadget+'" src="about:blank" frameborder="no" scrolling="no"'+(this.height?' height="'+this.height+'"':"")+(this.width?' width="'+this.width+'"':"")+"></iframe></div>")},finishRender:function(){window.frames[this.getIframeId()].location=
this.getIframeUrl()},getIframeUrl:function(a){return this.serverBase_+"ifr?container="+this.CONTAINER+"&mid="+this.id+"&nocache="+shindig.container.nocache_+"&country="+shindig.container.country_+"&lang="+shindig.container.language_+"&view="+shindig.container.view_+(this.specVersion?"&v="+this.specVersion:"")+(shindig.container.parentUrl_?"&parent="+encodeURIComponent(shindig.container.parentUrl_):"")+(this.debug?"&debug=1":"")+this.getAdditionalParams()+this.getUserPrefsParams()+(this.secureToken?
"&st="+this.secureToken:"")+"&url="+encodeURIComponent(this.specUrl)+(this.viewParams?"&view-params="+encodeURIComponent(gadgets.json.stringify(this.viewParams)):"")+(a?"&r="+a:"")+"#rpctoken="+this.rpcToken+(this.hashData?"&"+this.hashData:"")}};
shindig.OAAIfrGadget={getMainContent:function(a){a('<div id="'+this.cssClassGadgetContent+"-"+this.id+'" class="'+this.cssClassGadgetContent+'"></div>')},finishRender:function(){var a={className:this.cssClassGadget,frameborder:"no",scrolling:"no"};if(this.height)a.height=this.height;if(this.width)a.width=this.width;new OpenAjax.hub.IframeContainer(gadgets.pubsub2router.hub,this.getIframeId(),{Container:{onSecurityAlert:function(b,c){gadgets.error("Security error for container "+b.getClientID()+" : "+
c);b.getIframe().src="about:blank"}},IframeContainer:{parent:document.getElementById(this.cssClassGadgetContent+"-"+this.id),uri:this.getIframeUrl(),tunnelURI:shindig.uri(this.serverBase_+this.rpcRelay).resolve(shindig.uri(window.location.href)),iframeAttrs:a}})},getIframeUrl:function(a){return this.serverBase_+"ifr?container="+this.CONTAINER+"&mid="+this.id+"&nocache="+shindig.container.nocache_+"&country="+shindig.container.country_+"&lang="+shindig.container.language_+"&view="+shindig.container.view_+
(this.specVersion?"&v="+this.specVersion:"")+(this.debug?"&debug=1":"")+this.getAdditionalParams()+this.getUserPrefsParams()+(this.secureToken?"&st="+this.secureToken:"")+"&url="+encodeURIComponent(this.specUrl)+(this.viewParams?"&view-params="+encodeURIComponent(gadgets.json.stringify(this.viewParams)):"")+(a?"&r="+a:"")+(this.hashData?"#"+this.hashData:"")}};
shindig.Container=function(){this.gadgets_={};this.parentUrl_="http://"+document.location.host;this.language_=this.country_="ALL";this.view_="default";this.nocache_=1;this.maxheight_=2147483647};shindig.Container.inherits(shindig.Extensible);shindig.Container.prototype.gadgetClass=shindig.Gadget;shindig.Container.prototype.userPrefStore=new shindig.DefaultUserPrefStore;shindig.Container.prototype.gadgetService=new shindig.GadgetService;shindig.Container.prototype.layoutManager=new shindig.StaticLayoutManager;
shindig.Container.prototype.setParentUrl=function(a){this.parentUrl_=a};shindig.Container.prototype.setCountry=function(a){this.country_=a};shindig.Container.prototype.setNoCache=function(a){this.nocache_=a};shindig.Container.prototype.setLanguage=function(a){this.language_=a};shindig.Container.prototype.setView=function(a){this.view_=a};shindig.Container.prototype.setMaxHeight=function(a){this.maxheight_=a};shindig.Container.prototype.getGadgetKey_=function(a){return"gadget_"+a};
shindig.Container.prototype.getGadget=function(a){return this.gadgets_[this.getGadgetKey_(a)]};shindig.Container.prototype.createGadget=function(a){return new this.gadgetClass(a)};shindig.Container.prototype.addGadget=function(a){a.id=this.getNextGadgetInstanceId();this.gadgets_[this.getGadgetKey_(a.id)]=a};shindig.Container.prototype.addGadgets=function(a){for(var b=0;b<a.length;b++)this.addGadget(a[b])};shindig.Container.prototype.renderGadgets=function(){for(var a in this.gadgets_)this.renderGadget(this.gadgets_[a])};
shindig.Container.prototype.renderGadget=function(){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);};shindig.Container.prototype.nextGadgetInstanceId_=0;shindig.Container.prototype.getNextGadgetInstanceId=function(){return this.nextGadgetInstanceId_++};shindig.Container.prototype.refreshGadgets=function(){for(var a in this.gadgets_)this.gadgets_[a].refresh()};shindig.IfrContainer=function(){shindig.Container.call(this)};shindig.IfrContainer.inherits(shindig.Container);
shindig.IfrContainer.prototype.gadgetClass=shindig.BaseIfrGadget;shindig.IfrContainer.prototype.gadgetService=new shindig.IfrGadgetService;shindig.IfrContainer.prototype.setParentUrl=function(a){a.match(/^http[s]?:\/\//)||(a=document.location.href.match(/^[^?#]+\//)[0]+a);this.parentUrl_=a};if(gadgets&&gadgets.rpc){osapi._handleGadgetRpcMethod=function(a,b){for(var c=Array(a.length),d=0,e=this.callback,f=function(m,l){l({})},i=0;i<a.length;i++){var h=osapi;if(a[i].method.indexOf("_")==-1)for(var k=a[i].method.split("."),j=0;j<k.length;j++)if(h.hasOwnProperty(k[j]))h=h[k[j]];else{h=f;break}else h=f;h(a[i].params,function(m){return function(l){c[m]={id:a[m].id,data:l};d++;d==a.length&&e(c)}}(i),b)}};osapi.container={};osapi.container.listMethods=function(a,b){var c=[];recurseNames(osapi,
"",5,c);b(c)};var recurseNames=function(a,b,c,d){if(c!=0)for(var e in a)if(a.hasOwnProperty(e))if(e.indexOf("_")==-1){var f=typeof a[e];if(f=="function")d.push(b+e);else f=="object"&&recurseNames(a[e],b+e+".",c-1,d)}};gadgets.rpc.register("osapi._handleGadgetRpcMethod",osapi._handleGadgetRpcMethod)};osapi.container={};osapi.container.MetadataParam={LOCAL_EXPIRE_TIME:"localExpireTimeMs",URL:"url"};osapi.container.MetadataResponse={IFRAME_URL:"iframeUrl",NEEDS_TOKEN_REFRESH:"needsTokenRefresh",VIEWS:"views",EXPIRE_TIME_MS:"expireTimeMs",FEATURES:"features",HEIGHT:"height",MODULE_PREFS:"modulePrefs",PREFERRED_HEIGHT:"preferredHeight",PREFERRED_WIDTH:"preferredWidth",RESPONSE_TIME_MS:"responseTimeMs",WIDTH:"width"};osapi.container.TokenResponse={TOKEN:"token"};
osapi.container.NavigateTiming={URL:"url",ID:"id",START:"start",XRT:"xrt",SRT:"srt",DL:"dl",OL:"ol",PRT:"prt"};osapi.container.RenderParam={ALLOW_DEFAULT_VIEW:"allowDefaultView",CAJOLE:"cajole",CLASS:"class",DEBUG:"debug",HEIGHT:"height",NO_CACHE:"nocache",TEST_MODE:"testmode",USER_PREFS:"userPrefs",VIEW:"view",WIDTH:"width"};osapi.container.ViewParam={VIEW:"view"};osapi.container.CallbackType={ON_PRELOADED:"onPreloaded",ON_NAVIGATED:"onNavigated",ON_CLOSED:"onClosed",ON_UNLOADED:"onUnloaded",ON_RENDER:"onRender"};osapi.container.util={};osapi.container.util.getSafeJsonValue=function(a,b,c){return a[b]!=undefined&&a[b]!=null?a[b]:c};osapi.container.util.mergeJsons=function(a,b){var c={},d;for(d in a)c[d]=a[d];for(d in b)c[d]=b[d];return c};
osapi.container.util.newMetadataRequest=function(a){osapi.container.util.isArray(a)||(a=[a]);return{container:window.__CONTAINER,ids:a,fields:["iframeUrl","modulePrefs.*","needsTokenRefresh","userPrefs.*","views.preferredHeight","views.preferredWidth","expireTimeMs","responseTimeMs","rpcServiceIds"]}};osapi.container.util.newTokenRequest=function(a){osapi.container.util.isArray(a)||(a=[a]);return{container:window.__CONTAINER,ids:a,fields:["token"]}};
osapi.container.util.toArrayOfJsonKeys=function(a){var b=[],c;for(c in a)b.push(c);return b};osapi.container.util.isArray=function(a){return Object.prototype.toString.call(a)=="[object Array]"};osapi.container.util.isEmptyJson=function(a){for(var b in a)return false;return true};osapi.container.util.warn=function(a){console&&console.warn&&console.warn(a)};osapi.container.util.getCurrentTimeMs=function(){return(new Date).getTime()};
osapi.container.util.createIframeHtml=function(a){var b=[];b.push("<iframe ");for(var c in a){var d=a[c];if(d){b.push(c);b.push('="');b.push(d);b.push('" ')}}b.push("></iframe>");return b.join("")};osapi.container.Service=function(a){a=this.config_=a||{};this.registerOsapiServices();this.onConstructed(a)};osapi.container.Service.prototype.onConstructed=function(){};osapi.container.Service.prototype.registerOsapiServices=function(){gadgets.config.init({rpc:{parentRelayUrl:""},views:gadgets.config.views,"osapi.services":{"http://%host%/__api_endpoint/os/1.0/rpc":["people.get","people.getViewer","people.getViewerFriends","people.getOwner","people.getOwnerFriends"]}})};osapi.container.Container=function(a){a=this.config_=a||{};this.service_=new osapi.container.Service(a);this.initializeMixins_();this.onConstructed(a)};osapi.container.Container.prototype.onConstructed=function(){};osapi.container.Container.addMixin=function(a,b){osapi.container.Container.prototype.mixins_[a]=b};osapi.container.Container.prototype.mixins_={};osapi.container.Container.prototype.initializeMixins_=function(){for(var a in this.mixins_)this[a]=new this.mixins_[a](this)};shindig.LJIfrGadgetService=function(){shindig.IfrGadgetService.call(this);this.bindRpcMethods()};shindig.LJIfrGadgetService.inherits(shindig.IfrGadgetService);(function(){var a={};shindig.LJIfrGadgetService.registerRpcMethod=function(b,c){var d;if(arguments.length===1)d=b;else{d={};d[b]=c}for(var e in d)if(d.hasOwnProperty(e))a[e]=d[e]};shindig.LJIfrGadgetService.prototype.bindRpcMethods=function(){for(var b in a)a.hasOwnProperty(b)&&gadgets.rpc.register(b,this[a[b]])}})();
shindig.LJIfrGadgetService.registerRpcMethod({resize_iframe:"setHeight",set_title:"setTitle",requestNavigateTo:"requestNavigateTo","shindig.requestPermission":"requestPermission","shindig.requestShareApp":"requestShareApp","shindig.refreshSecurityToken":"refreshSecurityToken",set_pref:"setUserPref",requestSendMessage:"requestSendMessage"});shindig.LJIfrGadgetService.prototype.setHeight=function(a){var b=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);shindig.container.getGadget(b).setHeight(a)};
shindig.LJIfrGadgetService.prototype.setTitle=function(a){var b=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);shindig.container.getGadget(b).setTitle(a)};
shindig.LJIfrGadgetService.prototype.requestNavigateTo=function(a,b,c){var d=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);d=shindig.container.getGadget(d);var e=gadgets.views.getSupportedViews();c=c||d.owner_name;jQuery("#"+this.f);a=a.toUpperCase();if(!e.hasOwnProperty(a)||jQuery.inArray(a,d.available_views)===-1)return null;a=shindig.container._getUrlForView(a,d,c,b);b=b||{};b.app_id=d.app_id;for(var f in b)b.hasOwnProperty(f)&&!b[f]&&delete b[f];b=gadgets.json.stringify(b);f=
(f=/#(.+)$/.exec(a))&&f[0]||"";a=a.replace(f,"");if(b.length>0)a+=(a.indexOf("?")===-1?"?":"&")+"appParams="+encodeURIComponent(b);a+=f;if(a)document.location.href=a};
shindig.LJIfrGadgetService.prototype.requestPermission=function(a,b,c,d){var e=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);e=shindig.container.getGadget(e);var f=e.app_id,i=this.f;(new LJAppWidget_RequestPermission({title:"Ask Permission",finishCallback:function(h){h.status=="ERROR"?gadgets.rpc.call(i,"shindig.requestPermission_callback",null,a,h.code,h.message):gadgets.rpc.call(i,"shindig.requestPermission_callback",null,a,0,"",h.permissions)},authToken:e.auth_token},{reason:c||
"",permissions:b.join(","),app_id:f,st:d})).loadContent()};
shindig.LJIfrGadgetService.prototype.requestShareApp=function(a,b,c,d){var e=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);e=shindig.container.getGadget(e);var f=e.app_id,i=this.f;(new LJAppWidget_RequestShareApp({title:"Ask Share App",finishCallback:function(h){gadgets.rpc.call(i,"shindig.requestShareApp_callback",null,a,h.code,h.message,h.recipients)},authToken:e.auth_token},{extra:c||"",recipients:b.join(","),app_id:f,st:d})).loadContent()};
shindig.LJIfrGadgetService.prototype.refreshSecurityToken=function(a,b){var c=this.f,d=Site.siteroot.replace(/^http:\/\/www/,"http://api")+"/st/refresh/?st="+b+"&callback=?";jQuery.getJSON(d,function(e){gadgets.rpc.call(c,"shindig.refreshSecurityToken_callback",null,a,e,e.error)})};shindig.LJIfrGadgetService.prototype.setUserPref=function(){throw Error(shindig.errors.TO_BE_DONE);};shindig.LJIfrGadgetService.prototype.requestSendMessage=function(){throw Error(shindig.errors.TO_BE_DONE);};(function(){var a={},b=0;this.openGadget=function(c,d){var e=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f),f=shindig.container.getGadget(e);e=this.f;var i={app_id:f.app_id,st:c,owner_id:f.owner_id,module_id:shindig.container.getMaxModuleId(),viewer_id:Site.remoteUser};if(b>0)gadgets.rpc.call(this.f,"gadgets.views.openGadget.result_callback",null,"already_opened");else if(!(e in a)){if(d.view)i.view=d.view;if(d.viewParams)i.params=d.viewParams;f=new LJAppWidget_OpenGadget({dialogId:e,
authToken:f.auth_token},i);f.loadContent();a[e]={widget:f,opener_id:this.f,returnValue:null};b++;gadgets.rpc.call(this.f,"gadgets.views.openGadget.navigate_callback",null,e)}};this.close=function(c){var d;if(!c){c=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);c=shindig.container.getGadget(c);if(!c||!c.dialog_id)return;c=c.dialog_id;d=this.f}var e=a[c];if(e)if(!(!d&&e.opener_id!==c)){e.widget.close();d=d||e.widget.frameId;shindig.container.removeGadgetByFrameId(d);gadgets.rpc.call(e.opener_id,
"gadgets.views.openGadget.result_callback",null,e.returnValue);delete a[c];b--}};this.setReturnValue=function(c){var d=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);if((d=shindig.container.getGadget(d).dialog_id)&&a[d])a[d].returnValue=c};shindig.LJIfrGadgetService.registerRpcMethod({"gadgets.views.openGadget":"openGadget","gadgets.views.close":"close","gadgets.views.setReturnValue":"setReturnValue"})}).apply(shindig.LJIfrGadgetService.prototype);(function(){gadgets=gadgets||{};gadgets.config=gadgets.config||{};gadgets.config.views={CANVAS:{isOnlyVisible:true,urlTemplate:"http://{APP_SUBDOMAIN}.{DOMAIN}/{APP_KEY}"},SETTINGS:{urlTemplate:"{SITEROOT}/manage/settings/?cat=userapps&appid={APP_ID}"},ABOUT:{urlTemplate:"{SITEROOT}/games/#app_{APP_ID}"},INSTALL:{urlTemplate:"{SITEROOT}/games/install.bml?id={APP_ID}&act=install"},HOME:{urlTemplate:"{SITEROOT}#app_{APP_ID}"},COMMUNITY:{urlTemplate:"http://{COMMUNITY_NAME}.{DOMAIN}"},"COMMUNITY.PROFILE":{urlTemplate:"http://{COMMUNITY_NAME}.{DOMAIN}/profile"},
"COMMUNITY.ENTRY":{urlTemplate:"http://{COMMUNITY_NAME}.{DOMAIN}/{DITEMID}.html"},PROFILE:{urlTemplate:"http://{OWNER_NAME}.{DOMAIN}/profile"},JOURNAL:{urlTemplate:"http://{OWNER_NAME}.{DOMAIN}"},"JOURNAL.ENTRY":{urlTemplate:"http://{OWNER_NAME}.{DOMAIN}/{DITEMID}.html"},"JOURNAL.FRIENDS":{urlTemplate:"http://{OWNER_NAME}.{DOMAIN}/friends"},"EMBEDDED.ENTRY":{urlTemplate:"http://{JOURNAL_NAME}.{DOMAIN}/{DITEMID}.html"},"EMBEDDED.COMMENT":{urlTemplate:"http://{JOURNAL_NAME}.{DOMAIN}/{DITEMID}.html?thread={DTALKID}#t{DTALKID}"},
"EMBEDDED.MESSAGE":{urlTemplate:"{SITEROOT}/inbox/"},"EMBEDDED.ACTIVITY":{urlTemplate:"{SITEROOT}/games/info.bml?user={OWNER_NAME}"}}})();shindig.LJGadget=function(a,b){this.id=shindig.container.gadgetService.getGadgetIdFromModuleId(a);this.gadgetId=a;if(b)for(var c in b)if(b.hasOwnProperty(c))this[c]=b[c]};shindig.LJGadget.inherits(shindig.Extensible);shindig.LJGadget.prototype.setHeight=function(a){var b=jQuery("#"+this.gadgetId);if(a>shindig.container.maxheight_)a=shindig.container.maxheight_;b.length>0&&b.height(a)};
shindig.LJGadget.prototype.setTitle=function(a){var b=jQuery(".b-catalogue-app h1");b.length>0&&b.text(a.replace(/&/g,"&amp;").replace(/</g,"&lt;"))};shindig.LJPopupGadget=function(a,b,c){shindig.LJGadget.call(this,a,c);this.widget_=b};shindig.LJPopupGadget.inherits(shindig.LJGadget);shindig.LJPopupGadget.prototype.setHeight=function(a){this.widget_.setHeight(a)};shindig.LJPopupGadget.prototype.setTitle=function(a){this.widget_.setTitle(a)};shindig.LJIfrGadgetContainer=function(){shindig.IfrContainer.call(this)};
shindig.LJIfrGadgetContainer.inherits(shindig.IfrContainer);shindig.LJIfrGadgetContainer.prototype.gadgetClass=shindig.LJGadget;shindig.LJIfrGadgetContainer.prototype.gadgetService=new shindig.LJIfrGadgetService;
shindig.LJIfrGadgetContainer.prototype._getUrlForView=function(a,b,c,d){b={APP_ID:b.app_id,SITEROOT:Site.siteroot,DOMAIN:Site.siteroot.replace(/http:\/\/www\./g,""),APP_KEY:b.key,APP_SUBDOMAIN:b.app_domain,COMMUNITY_NAME:b.community_name,OWNER_NAME:c};c=gadgets.views.getSupportedViews()[a].getUrlTemplate();d=d||{};for(var e in d){a=e.toUpperCase();b.hasOwnProperty(a)||(b[a.toUpperCase()]=d[e])}return gadgets.views.bind(c,b)};
shindig.LJIfrGadgetContainer.prototype._getViewFromString=function(a){if(a.indexOf(".")==-1)return{surface:a};a=a.split(".");return{surface:a[0],secondary:a[1]}};shindig.LJIfrGadgetContainer.prototype.addGadget=function(a){if(!a.id)a.id=this.getNextGadgetInstanceId();this.gadgets_[this.getGadgetKey_(a.id)]=a};shindig.LJIfrGadgetContainer.prototype.removeGadget=function(a){a=this.getGadgetKey_(a);a in this.gadgets_&&delete this.gadgets_[a]};
shindig.LJIfrGadgetContainer.prototype.removeGadgetByFrameId=function(a){this.removeGadget(shindig.container.gadgetService.getGadgetIdFromModuleId(a))};shindig.LJIfrGadgetContainer.prototype.getMaxModuleId=function(){var a=0,b;for(b in this.gadgets_)if(this.gadgets_.hasOwnProperty(b))a=Math.max(a,+this.gadgets_[b].module_id);return a};
shindig.LJIfrGadgetContainer.prototype.findGadgets=function(){var a=this;jQuery("iframe.ljapp").filter(function(){if(!this.id)return false;var b=shindig.container.gadgetService.getGadgetIdFromModuleId(this.id);return!shindig.container.getGadget(b)}).each(function(){a.createGadget(this)})};
shindig.LJIfrGadgetContainer.prototype.createGadget=function(a,b){var c=jQuery(a);if(c.length===1){var d=gadgets.json.parse(decodeURIComponent(c.attr("data-view"))),e=c.prop("id");c=c.prop("src");var f=shindig.container.gadgetService.getGadgetIdFromModuleId(e);f=shindig.container.getGadget(f);if(!f){if(b&&b==="popup"){if(arguments.length<3)throw Error("widget must be passed  to the LJPopupGadget constructor");f=new shindig.LJPopupGadget(e,arguments[2],d)}else f=new shindig.LJGadget(e,d);shindig.container.addGadget(f);
gadgets.rpc.setupReceiver(e,c)}}};shindig.container=new shindig.LJIfrGadgetContainer;var commonContainer=new osapi.container.Container({});LiveJournal.register_hook("page_load",function(){shindig.container.findGadgets()});
;

/* file-end: js/apps/appcontainer.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.tmpl.min.js 
*/

/*
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright 2011, Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},i=0,c=0,l=[];function g(g,d,h,e){var c={data:e||(e===0||e===false)?e:d?d.data:{},_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};g&&a.extend(c,g,{nodes:[],parent:d});if(h){c.tmpl=h;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++i;(l.length?f:b)[i]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a(i[h])[d](k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,m,k){if(d[0]&&a.isArray(d[0])){var g=a.makeArray(arguments),h=d[0],j=h.length,i=0,f;while(i<j&&!(f=a.data(h[i++],"tmplItem")));if(f&&c)g[2]=function(b){a.tmpl.afterManip(this,b,k)};r.apply(this,g)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var i,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(j(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);i=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(j(c,null,i)):i},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){__=__.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(__,$1,$2);__=[];",close:"call=$item.calls();__=call._.concat($item.wrap(call,__));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){__.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){__.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function j(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:j(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=k(c).concat(b);if(d)b=b.concat(k(d))});return b?b:k(c)}function k(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,__=[],$data=$item.data;$value={};with($data){__.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,k,g,b,c,d){var j=a.tmpl.tag[k],i,e,f;if(!j)throw"Unknown template tag: "+k;i=j._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=h(b);d=d?","+h(d)+")":c?")":"";e=c?b.indexOf(".")>-1?b+h(c):"("+b+").call($item"+d:b;f=c?e:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else f=e=i.$1||"null";g=h(g);return"');"+j[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(f).split("$1").join(e).split("$2").join(g||i.$2||"")+"__.push('"})+"');}return __;")}function n(c,b){c._wrap=j(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function h(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,h;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(h=j.length-1;h>=0;h--)m(j[h]);m(k)}function m(j){var p,h=j,k,e,m;if(m=j.getAttribute(d)){while(h.parentNode&&(h=h.parentNode).nodeType===1&&!(p=h.getAttribute(d)));if(p!==m){h=h.parentNode?h.nodeType===11?0:h.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[h]||f[h]);e.key=++i;b[i]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;h=a.data(j.parentNode,"tmplItem");h=h?h.key:0}if(e){k=e;while(k&&k.key!=h){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery);
;

/* file-end: js/jquery/jquery.tmpl.min.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.lj.journalPromoStrip.js 
*/

/**
 * @name $.lj.journalPromoStrip
 * @requires $.ui.core, $.ui.widget, $.lj.basicWidget, $.lj.bubble
 * @class Implements functionality of Promo in Journals page via JSON-RPC API
 * @extends $.lj.basicWidget
 * @author artem.tyurin@sup.com (Artem Tyurin)
 */

(function ($, window) {
	'use strict';

	$.widget('lj.journalPromoStrip', $.lj.basicWidget, {

		options: {
			selectors: {
				'popupInfo': '.journalpromo-popup-content-info',
				'popupDelete': '.journalpromo-popup-content-delete',

				'button': '#journalpromo-popup-btn',
				'iconClose': '.b-journalpromo-actions-close',

				'options': '.b-journalpromo-header-options',
				'promoItem': '.b-journalpromo-item',
				'iconDelete': '.b-journalpromo-actions-delete',

				'info': '.journalpromo-popup-info-action',
				'spinner': '.journalpromo-popup-spinner',
				'error': '.journalpromo-popup-info-error',
				'errorContent': '.journalpromo-popup-info-error-content',

				'ban': '#journalpromo-user-ban'
			},

			classNames: {
				'iconInfo': '.journalpromo-info-icon',
				'iconDelete': '.b-journalpromo-actions-delete',
				'noPromo': 'b-journalpromo-item-nopromotion'
			},

			template: "<dt><a href='{rules_link}'>{subject}</a> {ljuser}</dt><dd>{body}</dd>"
		},

		_create: function () {
			var that = this;
			$.lj.basicWidget.prototype._create.apply(this);

			this._el('spinner');
			this._el('info');
			this._el('button');
			this._el('iconClose');
			this._el('error');
			that._el('promoItem');
			this._el('iconDelete');
			this._el('popupDelete');
			this._el('errorContent');

			if (this._el('iconDelete')[0]) {
				this._deleteBubble = this._popupDelete.bubble({
					target: this._cl('iconDelete'),
					showOn: 'click'
				});
			}

			this._el('popupInfo').bubble({
				target: this._cl('iconInfo'),
				showOn: 'hover',
				closeControl: false,
				showDelay: 500
			});

			this._bindControls();
		},

		_toggleSpinner: function(isLoading) {
			this._spinner.toggle(isLoading);

			this._info.toggle(!isLoading);
		},

		_toggleError: function(isError, message) {
			this._error.toggle(isError);

			this._info.toggle(!isError);

			if (message) {
				this._errorContent.text(message);
			}
		},

		_updateBlock: function(entry) {
			if (!entry.object[0].object_url) {
				this._promoItem.html(
					'<span class="b-journalpromo-item-message">' +
					entry.object[0].body +
					'</span>'
				).addClass(this._cl('noPromo'));
			} else {
				this._promoItem.html(
					this.options.template.supplant({
						'rules_link': entry.object[0].object_url,
						'subject': entry.object[0].subject,
						'body': entry.object[0].body,
						'ljuser': entry.object[0].ljuser_display
					})
				);		
			}
		},

		_closeClick: function() {
			var that = this;

			if (location.hash === '#__debug') {
				return this._debug();
			}

			that._toggleSpinner(true);

			LJ.Api.call('journalpromo.admin_cancel', {
				object_url: that.options.url,
				user: Site.currentJournal,
				get_slot: 1,
				ban_user: document.getElementById('journalpromo-user-ban').checked
			}, function(result) {
				that._toggleSpinner(false);

				console.dir(result);

				// promo could have been withdrawn after the page load
				if (result.error && result.error.data && result.error.data.entry) {
					that._updated = result.error.data.entry[0];
					that._toggleError(true, result.error.message);

					console.error(result.error.message);
					return;
				}

				if (!result.error && result.entry) {
					var entry = result.entry[0];

					if (!entry || !entry.object || !entry.object[0]) {
						console.error('Wrong data', result);
						return;
					}

					// re-render item and hide controls
					that._updateBlock(entry);
					that._iconDelete.hide();
				}

				that._deleteBubble.bubble('hide');
			});
		},

		_disableClick: function() {
			var that = this;
			LJ.Api.call('journalpromo.disable_promo_announce', {journal: LJ.pageVar('currentJournal', true)}, function(result) {
				if (!result.error) {
					that.element.slideUp('fast');
				}
			});
		},

		_bindControls: function() {
			var that = this;
			$.lj.basicWidget.prototype._bindControls.apply(this);

			this._button.on('click', this._closeClick.bind(this));
			this._iconClose.on('click', this._disableClick.bind(this));

			if (this._deleteBubble) {
				this._deleteBubble.bind('bubblehide', function(ev) {
					that._toggleError(false);

					if (that._updated) {
						that._updateBlock(that._updated);
						that._iconDelete.hide();
					}
				});
			}
		},

		_debug: function() {
			var that = this;

			that._toggleSpinner(true);
			setTimeout(function() {
				that._toggleSpinner(false);
				that._toggleError(true, 'Sample error');
			}, 1000);
		}
	});
}(jQuery, window));
;

/* file-end: js/jquery/jquery.lj.journalPromoStrip.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/lj.api.js 
*/

(function ($) {
	'use strict';
	/**
	 * TODO:
	 *
	 * If this api will go outside of livejournal.com it should get rid of all dependencies
	 * from jquery.js and basic.js and should require only a few libs from LJ namespace through LJ.require
	 * to handle everything.
	 */

	/**
	 * @namespace LJ.Api
	 * @requires basic.js, jquery.js, livejournal.js, jquery/jquery.xdomainrequest.js, lj.postmessage.js
	 * @description Api provides an unified method to handle communications with the server.
	 * @author dmitry.petrov@sup.com (Dmitry Petrov), anazarov@sup.com (Alexander Nazarov)
	 */
	LJ.define('LJ.Api');

	var origin = location.protocol + '//' + location.host,
		siteroot = window.Site? Site.siteroot : origin,
		url = '/__api/',
		cdn = {
			endpoint: (window.Site && location.protocol === 'http:')? (Site.jsonrpcprefix || Site.statprefix) : null,
			time: (window.Site? Site.server_time * 1000 : +new Date()),
			methods: {}
		},
		context = {
			options: {},
			endpoint: siteroot,
			sameDomain: siteroot === origin,
			batchTimeout: 125
		},
		batchQueue = [],
		batchTimeout,
		corsParameters = $.extend({
			url: context.endpoint + url,
			type: 'POST',
			dataType: 'json',
			contentType: 'text/plain'
		}, context.sameDomain? {} : {
			xhrFields: {
				withCredentials: true
			}
		}),
		inactivityInterval;

	cdn.time -= cdn.time % 9E+5;

	function createRequestBody(name, params) {
		return {
			jsonrpc: '2.0',
			method: name,
			params: $.extend({}, params, { auth_token: context.options.auth_token }),
			id: Unique.id()
		};
	}

	function handleAnswer (name, params, callback, answer) {
		if (answer.result) {
			if (!answer.result.auth_token) {
				LJ.console.warn('Server did not return the new auth_token, further request may fail');
			} else {
				context.options.auth_token = answer.result.auth_token;
				delete answer.result.auth_token;
			}

			if (callback) {
				callback(answer.result);
			}
		} else if (answer.error) {
			if (callback) {
				callback({ error: answer.error });
			}
		} else {
			LJ.warn('Server did not return error or result in response for method ' + name);

			if (callback) {
				callback({
					error: {
						message: 'Invalid response',
						code: 2
					}
				});
			}
		}
	}

	function handleError (name, params, callback) {
		LJ.warn('An internal error has occured while calling the method ', name);

		if (callback) {
			callback({
				error: {
					message: 'Internal error',
					code: 1
				}
			});
		}
	}

	function defer (request, params, callback) {
		var promise = new $.Deferred();

		batchQueue.push({
			data: request,
			params: params,
			callback: callback,
			promise: promise
		});

		if (!batchTimeout) {
			batchTimeout = setTimeout(function () {
				var query = batchQueue.splice(0, batchQueue.length);

				$.ajax($.extend(corsParameters, {
					data: LiveJournal.JSON.stringify(query.map(function (request) { return request.data; }))
				})).success(function (data) {
					var i, j, l, k, response, request;

					for (i = 0, l = data.length; i < l; i++) {
						response = data[i];

						for (j = 0, k = query.length; j < k; j++) {
							request = query[j];

							if (request.data.id === response.id) {
								if (request.promise.state() === 'pending') {
									/* Return result */
									handleAnswer(request.data.method, request.params, request.callback, response);
									request.promise.resolve();
								}
							}
						}
					}

					/* Some requests left unresolved */
					for (j = 0, k = query.length; j < k; j++) {
						request = query[j];

						if (request.promise.state() === 'pending') {
							handleError(request.data.method, request.params, request.callback);
							request.promise.resolve();
						}
					}
				}).error(function () {
					var i, l, request;

					for (i = 0, l = query.length; i < l; i++) {
						request = query[i];

						if (request.promise.state() === 'pending') {
							/* Return error */
							handleError(request.data.method, request.params, request.callback);
							request.promise.resolve();
						}
					}
				});

				batchTimeout = null;
			}, context.batchTimeout);
		}

		return promise;
	}

	/**
	 * Init LJ functionality.
	 *
	 * @param {Object} options Options for init object. auth_token field is required for further actions.
	 */
	LJ.Api.init = function(options) {
		options = options || {};

		if (context._initFired) {
			LJ.console.warn('LJ.Api.init was already called before');
		}

		context._initFired = true;
		context.options = $.extend({}, options);

		if (!context.options.auth_token) {
			LJ.console.warn('Auth token has not been specified, request may fail');
		}

		if (cdn.endpoint) {
			if (Site.rpc && Array.isArray(Site.rpc.public)) {
				Site.rpc.public.forEach(function (method) {
					cdn.methods[method] = true;
				});
			}
		}

		LJ.UI.bootstrap('lj-api');
	};

	/**
	 * Call api method on the server.
	 *
	 * @param {string} name Method name.
	 * @param {Object=} params A hash with parameters to send to the server.
	 * @param {Function=} callback Callback will be fired with results from the server.
	 */
	LJ.Api.call = function (name, params, callback) {
		var request = createRequestBody(name, params),
			publicMethod = !!cdn.methods.hasOwnProperty(name),
			endpoint = publicMethod? cdn.endpoint : context.endpoint,
			ajax, reqstr;

		// see LJ.Api.setInactivityInterval
		if (LJ.Activity.isInactiveMoreThan(inactivityInterval)) {
			LJ.Track.event('Site', 'Inactivity', 'API call aborted');
			console.log('Request is aborted due to inactivity');
			return;
		}

		if (!publicMethod && (LJ.Support.cors || context.sameDomain)) {
			/* CORS support detected or is not needed */
			return defer(request, params, callback);
		}

		/* Fall back to JSONP */
		if (publicMethod) {
			delete request.params.auth_token;
			request.id = cdn.time;
		}

		reqstr = LiveJournal.JSON.stringify(request);

		ajax = $.ajax($.extend({
			url: endpoint + url,
			dataType: 'jsonp',
			data: { request: reqstr }
		}, publicMethod? {
			cache: true,
			
			/*
			 * Name is added to handle the case with several requests,
			 * which complete not in order. Otherwise request will
			 * fail because jQuery deletes callback after the response
			 */
			jsonpCallback: 'jQuery' + cdn.time + name.split('.').join('__')
		} : {}));

		ajax
			.success(handleAnswer.bind(null, name, params, callback))
			.error(handleError.bind(null, name, params, callback));

		return ajax.promise();
	};

	/*
	 * Disable API calls when page is not active.
	 * Tracking code is in core/track.js.
	 *
	 * @param {Number} interval Interval in ms
	 */
	LJ.Api.setInactivityInterval = function(interval) {
		if (!LJ.Activity.hasInterval(interval)) {
			throw new Error('Wrong interval parameter');
		}

		inactivityInterval = interval;
	};
}(jQuery));
;

/* file-end: js/lj.api.js 
----------------------------------------------------------------------------------*/
