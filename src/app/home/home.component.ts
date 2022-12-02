import { Component, OnInit  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {  FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: any;
  product: any;
  category: any;
  categoryarray: string[] = [];
  //this is the index controler for saving the selected checklist
  num: any;
  categorydata: any;
  paginationactive: boolean = false;
  pages:any;
  currentpage:any;
  PageNgClass:any;
  calcPage:any;
  prdouctlength:any;
  itemPerPage:any;
  cart:any;
  cartarray: string[] = [];
  addToCartvar:any;
  indexcart:any;
  token: any;
  searchForm = new FormControl('');
  keyworld: any;
  titleText:any;
  allcheckbox:boolean =false;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
  ) {}

  ngOnInit() {
   
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    if(this.token==null){
      this.router.navigate([``]);
      alert("please Login in dont enter throw url")
    }
    this.go();
    this.num = 0;
    this.currentpage=0;
    this.PageNgClass=0;
    //here you can change the number product in pages
    this.itemPerPage=6;
    this.indexcart=0;
    this.addToCartvar=0;
  }

  go() {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => {
        this.product = data;

      });

  }


  //script build to add selcted item to array so ican mange to call item catagory when it selected 
  selected(category: any) {
    this.category = category
    if (this.categoryarray.length == 0) {
      // console.log("1")
      this.categoryarray[this.num] = this.category
      this.num = this.num + 1
      // console.log("first", this.categoryarray)
    } else {
      // console.log("2")
      this.categoryarray.forEach((item, index, object) => {
        if (item == this.category) {
          // console.log("3")
          object.splice(index, 1)
          this.num = this.num - 1
          // console.log("array index deleted", this.categoryarray)
          this.category = "";

        }
      });
      if (this.category != "") {
        // console.log("4")
        this.categoryarray[this.num] = this.category
        this.num = this.num + 1
        // console.log("arrayindex add", this.categoryarray)
      }
         // names of each catagory selected 
    
    }

    if(category=='all'){
      if(this.allcheckbox==false){
        this.allcheckbox=true;
        this.allproduct();
        
      }else{
        this.allcheckbox=false;
        this.categorydata=null
        this.paginationactive=false;
        this.titleText=null;
      }
      

    }else{

      this.itemCatagory();

    }

  }
  //end script

//using the array that has build from user i will try to fetch each product from there catagory name and join them in singal data
//but it is not working until now icant inset or conect or join only thing is building nested array and that is to complex to explan it 
// to the html code tp display dynamic the only thing working is the last catogry selected becous it is overwriting the array 
  itemCatagory(){
    console.log( this.categoryarray) 

    this.categoryarray.forEach((item, index, object) => {
      fetch('https://dummyjson.com/products/category/'+item)
      .then(res => res.json())
      .then(data => {
        this.paginationactive=false;
        this.titleText=data.products[0].category
        this.categorydata=data.products
      // this.paginationactive=true;


        // console.log("2")

        // this.price=(Number(this.categorydata.price)-(Number(this.categorydata.price)*(Number(this.categorydata.discountPercentage)/100)))
        // console.log(Number(this.categorydata.price))
       })
     

    });



   
  }

  allproduct(){
    fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(data => {

  this.categorydata=data.products
  this.prdouctlength=this.categorydata.length
  this.pages=(this.categorydata.length / this.itemPerPage);
  this.paginationactive=true;
  this.calcPage=this.currentpage*this.itemPerPage
  // console.log(this.currentpage,(this.categorydata.length-(this.categorydata.length-(this.currentpage+6))))
  this.titleText="All Products"
  //this calc is based on 6 item in each page that slice the array from 0-6 /6-12/ 12-18/... and it is dynamic  for any number of data
  this.categorydata=this.categorydata.slice(this.calcPage,(this.categorydata.length-(this.categorydata.length-(this.calcPage+this.itemPerPage))))
 })

  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  pagantion(i:any){
    this.PageNgClass=i
    this.currentpage=i
    this.allproduct();
  }

  pagantionPlus(){
    if((this.currentpage+1)<(this.prdouctlength/this.itemPerPage)){
      this.PageNgClass=this.PageNgClass+1;
      this.currentpage=this.currentpage+1;
      this.allproduct();
    }else{
      alert("No More Pages");

    }
  }
  pagantionMinus(){
    console.log(this.currentpage+1,(this.prdouctlength/this.itemPerPage))
    if((this.currentpage)<=(this.prdouctlength/this.itemPerPage)&&(this.currentpage+1)>=2){
      this.PageNgClass=this.PageNgClass-1;
      this.currentpage=this.currentpage-1;
      this.allproduct();
    }else{
      alert("No More Pages");

    }

  }

  addToCart(id:any){
    this.cart = id

    this.cartarray[this.indexcart] = this.cart
    this.indexcart = this.indexcart + 1
    this.addToCartvar=this.cartarray.length
    console.log("CartID",this.cartarray)
  }

  search(){
    this.keyworld=this.searchForm.value
    fetch('https://dummyjson.com/products/search?q='+this.keyworld)
    .then(res => res.json())
    .then(data => {
      this.paginationactive=false;
      this.titleText=this.keyworld;
      this.categorydata=data.products

     })
    
  }
  ChangeItemPerPAge(i:any){
    this.currentpage='0';
    this.PageNgClass='0'
    this.itemPerPage=i;
    this.allproduct();
  }
}
