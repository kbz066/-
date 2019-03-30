import React, { Component } from 'react'
import { Card } from 'antd';

import FilterForm from '../../components/BaseForm'
import Axios from '../../axios/axios';


export default class BikeMap extends Component {


    componentDidMount() {
        Axios.ajax({
            url: "bike_list"
        })
            .then((res) => {
                this.renderMap(res.data.result)

            })
    }
    renderMap = (result) => {
        this.map = new window.BMap.Map("container");
        // 创建地图实例  

        // 创建点坐标  

        this.map.enableScrollWheelZoom(true)
        this.addMapControl()
        this.renderArea(result.service_list)
        this.addMarker(result)
    }
    // 添加地图控件
    addMapControl = () => {
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }


    addMarker = (result) => {

        let bMap = window.BMap;

        let route_list = result.route_list

        let bike_list = result.bike_list


        var startIcon = new bMap.Icon(require("../../resource/assets/start_point.png"), new bMap.Size(36, 42), {

            imageSize: new bMap.Size(36, 42),

        });
        var endtIcon = new bMap.Icon(require("../../resource/assets/end_point.png"), new bMap.Size(36, 42), {

            imageSize: new bMap.Size(36, 42),

        });

        let first = route_list[0].split(",");
        let last = route_list[route_list.length - 1].split(",");;

        let startPont = new bMap.Point(first[0], first[1])
        let endPont = new bMap.Point(last[0], last[1])


        // 创建标注对象并添加到地图   

        this.map.addOverlay(new bMap.Marker(startPont, { icon: startIcon }));
        this.map.addOverlay(new bMap.Marker(endPont, { icon: endtIcon }));



        let brokenList = route_list.map((item) => {
            return new bMap.Point(item.split(",")[0], item.split(",")[1])
        })
        var polyline = new bMap.Polyline(
            brokenList,
            { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5 }
        );
        this.map.addOverlay(polyline);
        this.map.centerAndZoom(endPont, 11);


        bike_list.forEach(element => {
            var icon = new bMap.Icon(require("../../resource/assets/bike.jpg"), new bMap.Size(36, 42), { imageSize: new bMap.Size(36, 42), });
            console.log(element)
            let point = new bMap.Point(element.split(",")[0], element.split(",")[1])
            this.map.addOverlay(new bMap.Marker(point, { icon: icon }));
        });

    }

    renderArea = (areaList) => {
        let bMap = window.BMap;

        let brokenList = areaList.map((item) => {
            return new bMap.Point(item.lon, item.lat)
        })
        var polygon = new bMap.Polygon(
            brokenList,
            {
                strokeColor: "blue",
                strokeWeight: 3,
                strokeOpacity: 0.5,
                fillOpacity: 0.5,
                fillColor: "#ff8605"
            }
        );
        this.map.addOverlay(polygon);
    }

    filterSubmit = () => {

    }

    render() {


        const formList = [
            {
                id: 0,
                type: "SELECT",
                placeholder: "全部",
                label: "城市",
                optionValues: [
                    { key: 0, value: "全部" },
                    { key: 1, value: "北京" },
                    { key: 2, value: "天津" },
                    { key: 3, value: "广州" },
                    { key: 4, value: "上海" },

                ],
                width: 100,
                field: "city_id",
                initialValue: 0

            },
            {
                id: "1",
                type: "TIME",
                startPlaceholder: "请选择开始时间",
                endPlaceholder: "请选择结束时间"

            },
            {
                id: "2",
                type: "SELECT",
                label: "订单状态",
                field: "states",
                width: 150,
                initialValue: 0,
                optionValues: [
                    {
                        key: 0,
                        value: "全部"
                    },
                    {
                        key: 1,
                        value: "进行中"
                    },
                    {
                        key: 2,
                        value: "进行中(临时锁车)"
                    },
                    {
                        key: 3,
                        value: "行程结束"
                    },

                ]

            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm formList={formList} filterSubmit={this.filterSubmit} />
                </Card>
                <Card>
                    <div id="container" style={{ height: 500 }} />
                </Card>
            </div>
        )
    }
}