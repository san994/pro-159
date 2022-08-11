AFRAME.registerComponent("cursor-listener", {
    schema: {
      selectedItemId: { default: "", type: "string" },
    },
    init: function () {
      this.handleMouseEnterEvents();
      this.handleMouseLeaveEvents();
      
    },
    update:function(){
     const fadeBackgroundEl = document.querySelector("#fade-background");

     c=fadeBackgroundEl.children;
     if(c.length>0){
      for(var i = 0;i<=c.length;i++){
        fadeBackgroundEl.removeChild(c[i]);
      }
     }else{
      this.handleMouseClickEnvents()
     }
    },

    handlePlacesListState: function () {
      const id = this.el.getAttribute("id");
      const placesId = ["captain-aero", "outer-space", "spiderman", "superman"];
      if (placesId.includes(id)) {
        const placeContainer = document.querySelector("#comic-container");
        placeContainer.setAttribute("cursor-listener", {
          selectedItemId: id,
        });
        this.el.setAttribute("material", {
          color: "red",
          opacity: 1,
        });
      }
    },
    handleMouseClickEnvents:function(){
      this.el.addEventListener("click",(e)=>{

      const {selectedItemId} = this.data;

      const cursorEl = document.querySelector("#camera-cursor");
      const fadeBackgroundEl = document.querySelector("#fade-background");
      const titleEl = document.querySelector("#app-title");

      if(selectedItemId){
        fadeBackgroundEl.setAttribute("visible",true);
        fadeBackgroundEl.setAttribute("info-banner",{
          itemId:selectedItemId
        })
        titleEl.setAttribute("visible",false);
        cursorEl.setAttribute("position",{x:0,y:0,z:-1});
        cursorEl.setAttribute("geometry",{
          radiusInner:0.03,
          radiusOuter:0.04
        })
      }else{
        fadeBackgroundEl.setAttribute("visible",false);
        titleEl.setAttribute("visible",true);
        cursorEl.setAttribute("position",{x:0,y:0,z:-3});
        cursorEl.setAttribute("geometry",{
          radiusInner:0.08,
          radiusOuter:0.12
        })
      }

    })

    },
    handleMouseEnterEvents: function () {
      //Cursor 'mouseenter' Events
      this.el.addEventListener("mouseenter", () => {
        this.handlePlacesListState();
      });
    },
    handleMouseLeaveEvents: function () {
      //Cursor 'mouseleave' Events
      this.el.addEventListener("mouseleave", () => {
        const { selectedItemId } = this.data;
        if (selectedItemId) {
          const el = document.querySelector(`#${selectedItemId}`);
          const id = el.getAttribute("id");
          if (id == selectedItemId) {
            el.setAttribute("material", {
              color: "white",
              opacity: 1,
            });
          }
        }
      });
    },
  });