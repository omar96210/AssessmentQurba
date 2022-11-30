import { Component, OnInit } from '@angular/core';

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
  //this is the index controler for saving the items to display
  num2:any;
  items:any;
  data1: any;
  categorydata: object[] = [];
  constructor() {
    // constructor called first time before the ngOnInit()
  }

  ngOnInit() {

    this.go();
    this.num = 0;
    this.num2 = 0;

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
    }

    this.itemCatagory();
  }
  //end script


  itemCatagory(){
    
    this.categoryarray.forEach((item, index, object) => {
      fetch('https://dummyjson.com/products/category/'+item)
      .then(res => res.json())
      .then(data => {
        this.data1 = data.products;
        this.data1.forEach((item: any) => {
          this.categorydata[this.num2]=item
          this.num2=this.num2+1
          
        
        });
       })
    });
    console.log(this.categorydata)

   
  }


}
