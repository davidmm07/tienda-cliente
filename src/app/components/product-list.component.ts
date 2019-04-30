import { Component, OnInit, Input, AfterViewInit,IterableDiffers, OnChanges, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { StoreService } from '../services/store.service';
import { NavService } from '../services/nav.service';
import { Sublevel } from '../models/sublevel';
import { Product } from '../models/product';
import { FormControl} from '@angular/forms';
import { Options,LabelType } from 'ng5-slider';


@Component({
	selector:'product-list',
	templateUrl:'../views/product-list.html',
	providers:[UserService, StoreService, NavService]
})
//Menu
export class ProductListComponent implements OnInit, OnChanges, AfterViewInit{

	@Input() sublevelnotchild: Sublevel;
	@ViewChild(MatSort) sort: MatSort;	
	public titulo:string;
	public product: Product;
	public identity;
	public token;
	public alertMessage; 
	public sublevelchange: any;
	public dataSource = new MatTableDataSource<Product>();
	public nameFilter;
	public quantityFilter;
	public availableFilter;
	public globalFilter;
	public filteredValues;
	public levelsToShow;

	public minValue:number;
	public maxValue: number;
	public options:Options;

	displayedColumns: string[] = ['name', 'price', 'availability', 'quantity'];
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private userService: UserService,
		private storeService: StoreService,
		private navService: NavService,
		private differs: IterableDiffers
		) {
		this.titulo = 'Productos del subnivel: ';
		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
		this.nameFilter = new FormControl();
		this.quantityFilter  = new FormControl();
		this.availableFilter  = new FormControl();
		this.globalFilter = '';
		this.filteredValues = {
			quantity: '', 
			name: '', 
			price: '',
			available: ''
		};	
		this.levelsToShow= [
		{ level: true, active: false, name: 'Disponible' },
		{ level: false, active: false, name: 'No Disponible' }
		];
		//range of prices
		this.minValue = 10000;
		this.maxValue = 40000;
		this.options = {
			floor: 1000,
			ceil: 90000,
			translate: (value: number, label: LabelType): string => {
				switch (label) {
					case LabelType.Low:
					return '<b>Precio min:</b> $' + value;
					case LabelType.High:
					return '<b>Precio max:</b> $' + value;
					default:
					return '$' + value;
				}
			}
		};		


	}

	getProducts(){
		this.titulo = 'Productos del subnivel: '+ this.sublevelchange.name;
		if (this.sublevelchange._id) {
			this.storeService.get('products/'+this.sublevelchange._id).subscribe(
				response =>{
					this.dataSource.data = response.products as Product[];


				},error =>{
					if (error != null) {
						this.alertMessage = error.error.message;          
					}				
				});
		}
		else{
			console.log("Error");
		}


	}


	ngOnInit(){
		//this.dataSource.filterPredicate = this.customFilterPredicate();		
		console.log('product-list.component.ts cargado'+this.identity.name);

		this.quantityFilter.valueChanges.subscribe((quantityFilterValue) => {
			this.filteredValues['quantity'] = quantityFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});
		this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
			this.filteredValues['name'] = nameFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});
		this.dataSource.filterPredicate = this.customFilterPredicate();
	}

	customFilterPredicate() {
		const myFilterPredicate = (data: Product, filter: string): boolean => {
			var globalMatch = !this.globalFilter;

			if (this.globalFilter) {
				// search all text fields
				globalMatch = data.name.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
			}

			if (!globalMatch) {
				return;
			}

			let searchString = JSON.parse(filter);
			console.log(searchString);
			return data.quantity.toString().trim().indexOf(searchString.quantity) !== -1 &&
			data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1 && 
			(this.levelsToShow.filter(level => !level.active).length === this.levelsToShow.length ||
				this.levelsToShow.filter(level => level.active).some(level => level.level === data.available));
		}
		return myFilterPredicate;
	}

	updateFilter() {
		this.dataSource.filter = JSON.stringify(this.filteredValues);
	}

	ngOnChanges(changes) {
		if (changes['sublevelnotchild']) {
			// code...
			this.sublevelchange = this.sublevelnotchild
		}
		//console.log(this.sublevelchange);
		this.getProducts();



	}
	ngAfterViewInit(){

		this.dataSource.sort = this.sort;

	}

}
