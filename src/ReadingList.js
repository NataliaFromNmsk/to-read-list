import { Component } from "react";
import add from "./add.png";
import Swal from "sweetalert2"; 

export class ReadingList extends Component {
    state= {
        userInput: "",
        readingList: []
    }

    onChangeEvent(e) {
        this.setState({userInput: e})
    }

    addBook(input) {
        if (input === "") {             
                let timerInterval  
                Swal.fire({  
                  title: 'Ой',  
                  html: 'Введите название книги, пожалуйста',  
                  showConfirmButton: false,  
                  showCancelButton: true,  
                  cancelButtonColor: 'rgb(184,94,107)',  
                  cancelButtonText: 'Понятно',
                  timer: 3000,  
                  timerProgressBar: true,  
                  onBeforeOpen: () => {  
                    Swal.showLoading()  
                    timerInterval = setInterval(() => {  
                      const content = Swal.getContent()  
                      if (content) {  
                        const b = content.querySelector('b')  
                        if (b) {  
                          b.textContent = Swal.getTimerLeft()  
                        }  
                      }  
                    }, 100)  
                  },  
                  onClose: () => {  
                    clearInterval(timerInterval)  
                  }  
                }).then((result) => {  
                  if (result.dismiss === Swal.DismissReason.timer) {  
                    console.log('I was closed by the timer')  
                  }  
                })         
        }
        else {
            let listArray = this.state.readingList;
            listArray.push(input);
            this.setState({readingList: listArray, userInput: ""});
            document.querySelector(".btnDel").style.display = "block";
            if (listArray.length >= 2) {
                document.querySelector(".btnSort").style.display = "block";
            }
        }  
    }   

    crossBook(event) { 
        const li = event.target;    
        li.classList.toggle("crossed");
        document.querySelector(".btnSort").style.display = "none";
    }

    deleteBooks() {
        Swal.fire({
            title: 'Вы уверены?',
            text: "Удаление списка книг нельзя отменить!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#238D43',
            cancelButtonColor: 'rgb(184,94,107)',
            confirmButtonText: 'Да, удалить!'
          }).then((result) => {
            if (result.isConfirmed) {
                let listArray = this.state.readingList;
                listArray = [];
                this.setState({readingList: listArray});
                
                let timerInterval 
                Swal.fire({  
               
                    html: 'Список книг успешно удален',  
                    showConfirmButton: false,  
                    showCancelButton: true,  
                    cancelButtonColor: 'rgb(184,94,107)',  
                    cancelButtonText: 'Понятно',
                    timer: 3000,  
                    timerProgressBar: true,  
                    onBeforeOpen: () => {  
                    Swal.showLoading()  
                    timerInterval = setInterval(() => {  
                        const content = Swal.getContent()  
                        if (content) {  
                        const b = content.querySelector('b')  
                        if (b) {  
                            b.textContent = Swal.getTimerLeft()  
                        }  
                        }  
                    }, 100)  
                    },  
                    onClose: () => {  
                    clearInterval(timerInterval)  
                    }  
                    }).then((result) => {  
                        if (result.dismiss === Swal.DismissReason.timer) {  
                        console.log('I was closed by the timer')  
                        }  
                    })         
              setTimeout(function(){
                window.location.reload();
             }, 2500);
              
              
            }
            
          }) 
          
    }

    sortBooks() {
        let listArray = this.state.readingList;
        listArray.sort();
        this.setState({readingList: listArray});
        document.querySelector(".inp").style.display = "none";
    }

    onFormSubmit(e) {
        e.preventDefault();
    }

    render() {
        return(
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <div className="container inp">
                        <input placeholder="Что хочу прочитать" 
                               type="text" 
                               onChange={(e) => this.onChangeEvent(e.target.value)} 
                               value={this.state.userInput}/>
                        <button onClick={() => this.addBook(this.state.userInput)} className="add"><img src={add} width="32px" height="32px" alt="add" /></button>
                    </div>
                    <div className="container">
                        <ul>
                            {this.state.readingList.map((item, index) => (
                                <li onClick={this.crossBook} key={index}>
                                    {item}                                    
                                </li>
                            ))}     
                        <p  className="number">Количество книг в списке: {this.state.readingList.length === 0 ? 0 : this.state.readingList.length}</p>                    
                        </ul>     
                        
                    </div>
                    
                    <div className="container">
                        <button className="btn btnSort" onClick={() => this.sortBooks()}>Сортировать А-Я</button>
                    </div>
                    
                    <div className="container">
                        <button className="btn btnDel" onClick={() => this.deleteBooks()}>Удалить всё</button>
                    </div>

                </form>
            </div>
        )
    }
}