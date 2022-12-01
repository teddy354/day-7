package main

import (
	"fmt"
	"html/template"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	route := mux.NewRouter()
	route.PathPrefix("/public/").Handler(http.StripPrefix("/public/", http.FileServer(http.Dir("./public"))))

	route.HandleFunc("/", home).Methods("GET")
	route.HandleFunc("/form-project", formProject).Methods("GET")
	route.HandleFunc("/contact", contact).Methods("GET")
	route.HandleFunc("/process-form-project", processFormProject).Methods("POST")

	fmt.Println("Server starting on host 5500")
	http.ListenAndServe("localhost:5500", route)
}

func home(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "text/html; charset=utf-8")
	tmpt, err := template.ParseFiles("view/index.html")

	if err != nil {
		w.Write([]byte("Message: " + err.Error()))
		return
	}

	tmpt.Execute(w, nil)
}

func formProject(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "text/html; charset=utf-8")
	tmpt, err := template.ParseFiles("view/addproject.html")

	if err != nil {
		w.Write([]byte("Message: " + err.Error()))
		return
	}

	tmpt.Execute(w, nil)
}

func processFormProject(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()

	if err != nil {
		w.Write([]byte("Message: " + err.Error()))
		return
	}

	fmt.Println("Project Name: " + r.PostForm.Get("project_name"))
	fmt.Println("Start Date: " + r.PostForm.Get("start_date"))
	fmt.Println("End Date: " + r.PostForm.Get("end_date"))
	fmt.Println("Technologies: ", r.Form["technologies"])
	fmt.Println("Description: " + r.PostForm.Get("description"))

	http.Redirect(w, r, "/form-project", http.StatusMovedPermanently)

}

func contact(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "text/html; charset=utf-8")
	tmpt, err := template.ParseFiles("view/Contact.html")

	if err != nil {
		w.Write([]byte("Message: " + err.Error()))
		return
	}

	tmpt.Execute(w, nil)
}
