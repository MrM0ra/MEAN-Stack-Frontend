import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

	title="Crear Producto"
	productForm: FormGroup
	id:string | null

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService,
	private productService: ProductService, private aRouter: ActivatedRoute) { 
	this.productForm=fb.group({
		product: ['',Validators.required],
		category: ['',Validators.required],
		location: ['',Validators.required],
		price: ['',Validators.required]
	})

	this.id=this.aRouter.snapshot.paramMap.get('id')
  }

  showSuccess() {
	this.toastr.success('Producto registrado con exito', 'Producto agregado');
  }

  addProduct(){
	const PRODUCT: Product = {
		name: this.productForm.get('product')?.value,
		category: this.productForm.get('category')?.value,
		location: this.productForm.get('location')?.value,
		price: this.productForm.get('price')?.value,
	}
	
	if(this.id !== null){
		//Edit product
		this.productService.editProduct(this.id, PRODUCT).subscribe(data=>{
			this.toastr.success('Producto actualizado con exito', 'Producto actualizado');
			this.router.navigate(['/'])
		},error => {
			console.log(error)
			this.productForm.reset()
		})
	}else{
		//Create product
		this.productService.createProduct(PRODUCT).subscribe(data=>{
			this.showSuccess()
			this.router.navigate(['/'])
		},error => {
			console.log(error)
			this.productForm.reset()
		})
	}
  }

	isEdit(){
		if(this.id!=null){
			this.title = "Editar producto"
			this.productService.getProduct(this.id).subscribe(data=>{
			this.productForm.setValue({
				product: data.name,
				category: data.category,
				location: data.location,
				price: data.price
			})
		   }) 
		} 
	}

	ngOnInit(): void {
		this.isEdit()
	}

}
