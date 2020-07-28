function storeFormData(data) {
        localStorage.setItem("carriers", JSON.stringify(data))
        loadContent("carriers")
}
