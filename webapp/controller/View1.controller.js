sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/m/MessageBox",
    "sap/m/MessageToast"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, Filter, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("crudoperation.odatacrudoperationsproject.controller.View1", {
            onInit: function () {
              //  var oSorter = new sap.ui.model.Sorter('Zcity', false);
                this.onReadAll();
            },

            onReadAll: function () {
                var that = this;

                //   var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEMPLOYEE_EEE_SRV/")
                var oModel = that.getOwnerComponent().getModel();
                debugger;
                var oSorter = new sap.ui.model.Sorter('Zcity', false);
                oModel.read("/userSet", {
                    sorters: [oSorter],
                    success: function (odata1) {
                        var oModel1 = new sap.ui.model.json.JSONModel();

                        oModel1.setData(odata1);
                        that.getView().setModel(oModel1, "Data1");
                        MessageBox.success("Success");
                        //  alert("Success");
                    },
                    error: function (oError) {
                        MessageBox.error("Error");
                        //   alert("Error");
                    }
                });
            },

            handleCreateStatement: function (oEvent) {
                debugger;

                var that = this;
                var letter2 = /^[A-Za-z]*$/;
                var isNum = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEMPLOYEE_EEE_SRV/");

                var name1 = sap.ui.getCore().byId("nam1").getValue();
                var emprole1 = sap.ui.getCore().byId("rol1").getValue();
                var gender1 = sap.ui.getCore().byId("gndr1").getValue();
                var number1 = sap.ui.getCore().byId("nmbr1").getValue();
                var city1 = sap.ui.getCore().byId("adrs1").getValue();

                if(name1 === ""){
                    alert("Name can't be Blank");
                    return false;
                }

                if (name1.match(letter2) === null) {
                    alert("Please Enter name in Alphabet only");
                    sap.ui.getCore().byId("nam1").setValue("");
                    return false;
                   // name1.setValue = "" ;
                }

                if(emprole1 === ""){
                    alert("Employee Role can't be Blank");
                    return false;
                }

                if (emprole1.match(letter2) === null) {
                    alert("Please Enter Role in Alphabet only");
                    sap.ui.getCore().byId("rol1").setValue("");
                    return false;
                }

                if(number1 === ""){
                    alert("Number can't be Blank");
                    return false;
                }

                if (number1.match(isNum) === null) {
                    alert("Only numbers with 10 digits are allowed in numeric value");
                    sap.ui.getCore().byId("nmbr1").setValue("");
                    return false;
                }

                if(city1 === ""){
                    alert("Address can't be Blank");
                    return false;
                }

                var Payload = {
                    "Name": name1,
                    "Zemprole": emprole1,
                    "Zgender": gender1,
                    "Znumber": number1,
                    "Zcity": city1
                };

                oModel.create("/userSet", Payload, {
                    success: function (Data) {
                        method: "POST",
                            MessageBox.success("Created Successfully!");
                        //   alert("Created Successfully!");
                        /*  this._Dialog.close();
                          return;   */

                      //  var that = this;
                        var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEMPLOYEE_EEE_SRV/");


                        oModel.read("/userSet", {
                            success: function (odata1) {
                                var oModel1 = new sap.ui.model.json.JSONModel();
                                oModel1.setData(odata1);
                                that.getView().setModel(oModel1, "Data1");
                                //  alert(odata1);
                            },
                            /*   error: function (oError) {
                                   alert("Error");
                               }   */
                        });
                    },
                    error: function (oError) {
                        //  alert("Error!");
                        MessageBox.error("Error");
                    }
                })
                this._Dialog.close();
                sap.ui.getCore().byId("nam1").setValue("");
                sap.ui.getCore().byId("rol1").setValue("");
                sap.ui.getCore().byId("gndr1").setValue("");
                sap.ui.getCore().byId("nmbr1").setValue("");
                sap.ui.getCore().byId("adrs1").setValue("");
            },

            onLoadDialog: function () {

                if (!this._Dialog) {
                    this._Dialog = sap.ui.xmlfragment("crudoperation.odatacrudoperationsproject.fragments.fragment1", this);
                    this.getView().addDependent(this._Dialog);
                }
                this._Dialog.open();
            },

            onClose: function () {
                this._Dialog.close();
            },

            handleEditStatement: function (oEvent) {
                debugger;
                var that = this;
                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEMPLOYEE_EEE_SRV/");

                var oTable = that.getView().byId("table1");
                var oSelectedItems = oTable.getSelectedItems();

                if (oSelectedItems.length > 0) {

                    //  var name1 = oSelectedItems[0].mAggregations.cells[0].mProperties.text;
                    var name1 = oSelectedItems[0].mAggregations.cells[0].mProperties.value;
                    var emprole1 = oSelectedItems[0].mAggregations.cells[1].mProperties.value;
                    var gender1 = oSelectedItems[0].mAggregations.cells[2].mProperties.value;
                    var number1 = oSelectedItems[0].mAggregations.cells[3].mProperties.value;
                    var city1 = oSelectedItems[0].mAggregations.cells[4].mProperties.value;


                    if (oEvent.getSource().getText() === "Edit") {
                        oEvent.getSource().setText("Submit");
                        /*     oEvent.getSource().getParent().getParent().getCells()[0].setEditable(true);   */
                        // oEvent.getSource().getParent().getParent().getCells()[1].setEditable(true);
                        // oEvent.getSource().getParent().getParent().getCells()[2].setEditable(true);
                        // oEvent.getSource().getParent().getParent().getCells()[3].setEditable(true);
                        // oEvent.getSource().getParent().getParent().getCells()[4].setEditable(true);

                        oSelectedItems[0].mAggregations.cells[1].setEditable(true);
                        oSelectedItems[0].mAggregations.cells[2].setEditable(true);
                        oSelectedItems[0].mAggregations.cells[3].setEditable(true);
                        oSelectedItems[0].mAggregations.cells[4].setEditable(true);
                        MessageToast.show("Edit mode has been Enabled!"); 

                    }
                    else {
                        //  debugger;
                        oEvent.getSource().setText("Edit");

                        /*     oEvent.getSource().getParent().getParent().getCells()[0].setEditable(false);   */
                        // oEvent.getSource().getParent().getParent().getCells()[1].setEditable(false);
                        // oEvent.getSource().getParent().getParent().getCells()[2].setEditable(false);
                        // oEvent.getSource().getParent().getParent().getCells()[3].setEditable(false);
                        // oEvent.getSource().getParent().getParent().getCells()[4].setEditable(false);

                        oSelectedItems[0].mAggregations.cells[1].setEditable(false);
                        oSelectedItems[0].mAggregations.cells[2].setEditable(false);
                        oSelectedItems[0].mAggregations.cells[3].setEditable(false);
                        oSelectedItems[0].mAggregations.cells[4].setEditable(false);

                        var Payload = {
                            "Name": name1,
                            "Zemprole": emprole1,
                            "Zgender": gender1,
                            "Znumber": number1,
                            "Zcity": city1
                        };

                        //   that.onReadAll();
                        oModel.update("/userSet('" + name1 + "')", Payload, {
                            method: "PUT",
                            success: function (Data) {
                                MessageBox.success("Record Updated!");
                                //  alert("Record Updated!");

                                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEMPLOYEE_EEE_SRV/");

                                //   t.onReadAll();

                                oModel.read("/userSet", {
                                    success: function (odata1) {
                                        var oModel1 = new sap.ui.model.json.JSONModel();
                                        oModel1.setData(odata1);
                                        that.getView().setModel(oModel1, "Data1");
                                        //  alert(odata1);
                                    },
                                    error: function (oError) {
                                        MessageBox.error("Error");
                                        // alert("Error");
                                    }
                                });
                            },
                            error: function (oError) {
                                //   alert("Error!");
                                MessageBox.error("Error");
                            }
                        })

                    }
                } else {
                    MessageToast.show("Please select a row to Update!");
                    //  alert("Please select a row to Update!");
                }
            },

            handleDeleteStatement: function (oEvent) {
                debugger;
                var that = this;
                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEMPLOYEE_EEE_SRV/");

                var oTable = this.getView().byId("table1");
                var oSelectedItems = oTable.getSelectedItems();

                if (oSelectedItems.length > 0) {
                    //  var oId = oSelectedItems[0].mAggregations.cells[0].mProperties.text;
                    var oId = oSelectedItems[0].mAggregations.cells[0].mProperties.value;
                    oModel.remove("/userSet('" + oId + "')", {

                        method: "DELETE",
                        success: function (Data) {
                            //  alert("success");
                            alert("Are you sure, you want to delete? ");
                            var t = this;
                            var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEMPLOYEE_EEE_SRV/");

                            //   t.onReadAll();

                            oModel.read("/userSet", {
                                success: function (odata1) {
                                    var oModel1 = new sap.ui.model.json.JSONModel();
                                    oModel1.setData(odata1);
                                    t.getView().setModel(oModel1, "Data1");
                                    MessageBox.success("Record Deleted Successfully..");
                                    //  alert("Record Successfully Deleted..")
                                    //  alert(odata1);
                                },
                                error: function (oError) {
                                    MessageBox.error("Error");
                                    //  alert("Error");
                                }
                            });
                        },
                        error: function (oError) {

                            //   alert("Error!");
                            MessageBox.error("Error");
                        }
                    })
                } else {
                    MessageToast.show("Please select a row to delete!");
                    //   alert("Please select a row to delete!");
                }
            },

            onFilterSearch: function (oEvent) {
                debugger;
              var sQuery = oEvent.getParameter("query"),
                  oTable = this.getView().byId("table1"),
                  oBinding = oTable.getBinding("items");

              if (oEvent.getId() == "liveChange") {
                  sQuery = oEvent.getParameter("query");
              }

              if (sQuery) {
                  var oFilter1 = new Filter("Name", "EQ", sQuery);
                  var oFilter2 = new Filter("Zemprole", "EQ", sQuery);
                  var oFilter3 = new Filter("Zgender", "EQ", sQuery);
                  var oFilter4 = new Filter("Znumber", "EQ", sQuery);
                  var oFilter5 = new Filter("Zcity", "EQ", sQuery);
                 
                  var aFilter = new Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5]);
              }

              oBinding.filter(aFilter);
          },

            Lock: function (oEvent) {

                if (oEvent.getSource().getText() === "Locked") {
                    oEvent.getSource().setText("Unlocked");

                    oEvent.getSource().setIcon("sap-icon://unlocked");
                    this.byId("edit1").setVisible(true);
                    this.byId("add1").setVisible(true);
                    this.byId("delete1").setVisible(true);
                    this.byId("table1").setMode("MultiSelect");

                    MessageToast.show("Locked button has been pressed!")
                }
                else {
                    oEvent.getSource().setText("Locked");
                    oEvent.getSource().setIcon("sap-icon://locked");

                    this.byId("edit1").setVisible(false);
                    this.byId("add1").setVisible(false);
                    this.byId("delete1").setVisible(false);
                    this.byId("table1").setMode("None");                 

                    MessageToast.show("UnLocked button has been pressed!");
                }
            }
        });
    });





