import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import * as platform from "tns-core-modules/platform/platform";
import { Page } from "tns-core-modules/ui/page";
import { req_barang } from "../controller/barang";
import { Barang } from "../model/barang";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    kirim = true;
    temp;
    data = []

    constructor(private page: Page, private routerExtensions: RouterExtensions,
        private route: ActivatedRoute,) {
        this.page.actionBarHidden = true;
        this.route.queryParams.subscribe(params => {
            console.log(params);
            this.temp = JSON.parse(params["gudang"])
        })
        // Use the component constructor to inject providers.
    }

    async ngOnInit() {
        var result = await req_barang(this.temp)
        if (result != false) {
            var temp = result.data
            var i = 0;
            temp.map((obj=>{
                obj['list_id'] = i
                i++
            }))

            console.log(temp);

            this.data = temp
        } else {
            this.alert("Akun anda tidak ditemukan.");
        }
        // this.data.push({ text: "Bulbasaur", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" });
        // this.data.push({ text: "Ivysaur", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" });
        // this.data.push({ text: "Venusaur", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" });
        // this.data.push({ text: "Charmander", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" });
        // this.data.push({ text: "Charmeleon", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png" });
        // this.data.push({ text: "Charizard", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" });
        // this.data.push({ text: "Squirtle", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" });
        // this.data.push({ text: "Wartortle", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png" });
        // this.data.push({ text: "Blastoise", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png" });
        // this.data.push({ text: "Caterpie", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png" });
        // this.data.push({ text: "Metapod", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png" });
        // this.data.push({ text: "Butterfree", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png" });
        // this.data.push({ text: "Weedle", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png" });
        // this.data.push({ text: "Kakuna", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png" });
        // this.data.push({ text: "Beedrill", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png" });
        // this.data.push({ id: 1, text: "Bulbasaur", qty : 0, harga: 'Rp 119000', src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" });
        // this.data.push({ id: 2, text: "Ivysaur", qty: 0, harga: 'Rp 119000', src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" });
        // this.data.push({ id: 3, text: "Venusaur", qty: 0, harga: 'Rp 119000', src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" });
        // Init your component properties here.
    }

    toDetail(id) {
        console.log(id);

        // var dataDetail = this.data[id]
        // for (let index = 0; index < this.dataOrder.length; index++) {
        //     if (this.dataOrder[index].id == dataDetail.id) {
        //         dataDetail.qty = this.dataOrder[index].qty
        //     }
        // }

        // let options = {
        //     context: { data: JSON.stringify(dataDetail) },
        //     fullscreen: true,
        //     viewContainerRef: this.vcRef
        // };
        // this.modal.showModal(ModalK24Detail, options).then((res: string) => {
        //     if (res) {
        //         var result = JSON.parse(res)
        //         this.updateOrder(result.id, result.qty)
        //         this.data[id].qty = result.qty
        //     }
        // });
    }

    incdec(category, id) {
        if (category == 0) {
            if (this.data[id].qty > 0) {
                this.data[id + 1].qty -= 1
                // this.updateOrder(id, this.data[id].qty)
            }
        }
        else {
            this.data[id + 1].qty += 1
            // this.updateOrder(id, this.data[id].qty)
        }
    }

    // updateOrder(id, qty) {
    //     var isExists = false
    //     for (let index = 0; index < this.dataOrder.length; index++) {
    //         console.log("this.dataOrder[index].id => " + this.dataOrder[index].id)
    //         console.log("id => " + id)
    //         if (this.dataOrder[index].id == id) {
    //             isExists = true
    //             if (qty > 0) {
    //                 this.dataOrder[index].qty = qty
    //                 this.dataOrder[index].price = this.data[id].price * qty
    //             }
    //             else {
    //                 this.dataOrder.splice(index, 1);
    //             }
    //             break
    //         }
    //     }

    //     if (!isExists) {
    //         this.dataOrder.push({
    //             qty: qty,
    //             name: this.data[id].name,
    //             price: this.data[id].price,
    //             id: id
    //         })
    //     }
    // }

    getHeight(percentage) {
        return platform.screen.mainScreen.heightDIPs * percentage / 100
    }

    getWidth(percentage) {
        return platform.screen.mainScreen.widthDIPs * percentage / 100
    }

    alert(message: string) {
        return alert({
            title: "INVENTARIS",
            okButtonText: "OK",
            message: message
        });
    }
}
