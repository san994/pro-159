AFRAME.registerComponent("comic",{
  init:function(){
      this.comiccontainer = this.el;
      this.createCards();
  },
  createCards:function(){
    const thumbnailRef = [{id:"captain-aero",title:"Captain Aero",url:"./assets/bookImage/captain-aero-poster.jpg"},
                          {id:"outer-space",title:"Outer Space",url:"./assets/bookImage/outer-space-poster.jpg"},
                          {id:"spiderman",title:"Spider-Man",url:"./assets/bookImage/spiderman-poster.jpg"},
                          {id:"superman",title:"SuperMan",url:"./assets/bookImage/superman-poster.jpg"}];
    
    let previousXposition = -60;                      
    for(var item of thumbnailRef){
      const posX = previousXposition+25;
      const posY = 10;
      const posZ = -40;
      const position = {x:posX,y:posY,z:posZ};
      previousXposition = posX;

       // border element
       const borderEl = this.createBorder(position,item.id);
       // poster element
       const poster = this.createPoster(item);
       borderEl.appendChild(poster);
       // title text element
       const titleEl = this.createTitleEl(position,item);
       borderEl.appendChild(titleEl);
       
       this.comiccontainer.appendChild(borderEl);
    }
  },
  createBorder: function (position, id) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "ring",
      radiusInner: 15,
      radiusOuter: 16,
    });
    entityEl.setAttribute("position", position);
    entityEl.setAttribute("material", {
      color: "white",
      opacity: 1,
    });

    //Add cursor-listener component to the ring border entity to change it's color 
    //On Cursor 'mouseenter' and 'mouseleave' entity
    entityEl.setAttribute("cursor-listener", {});

    return entityEl;
  },
  createPoster: function (item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "plane",
      height:28,
      width:20
    });
    entityEl.setAttribute("material", { src: item.url });

    return entityEl;
  },
  createTitleEl: function (position, item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("text", {
      font: "exo2bold",
      align: "center",
      width: 70,
      color: "#e65100",
      value: item.title,
    });
    const elPosition = position;
    elPosition.y = -20;
    entityEl.setAttribute("position", elPosition);
    entityEl.setAttribute("visible", true);
    
    return entityEl;
  },
})