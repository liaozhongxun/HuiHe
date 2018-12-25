
/*-当前项目工具类-*/
export default class Tool {
  constructor() {}

  static listItem(item) { //地图海量点标记数据配置
    return { 
        lnglat: [item.lng, item.lat], 
        name: item.name,
        // d_name: dname[0], 
        // d_code: dname[1], 
        dname:this.devSplit(item.dname),
        id: item.id, 
        conn: item.connstate, 
        style: this.setStyle(item.connstate),
        type: item.type 
    }
  }
  static setStyle(conn) {
    switch (conn) {
      case '在线':
        return 0;
        break;
      case '离线':
        return 1;
        break;
      case '告警':
        return 2;
        break;
      case '异常':
        return 3;
        break;
    }
  }
  static devSplit(name){
    let dname = name.split(",");
    let dname_arr = []; 
    for(let i in dname){
        dname_arr.push(dname[i].split("_"));
    }
    return dname_arr;
  }

  static mapDevImgTool(res,sto){
    res.map(function(resItem,ri){
      sto.map(function(stoItem,si){
         if(stoItem.model == resItem.model){
            // console.log(stoItem,si)
            // console.log(resItem,ri)
            res[ri].icon = window.applicationConfig.fileApi + stoItem.icon;;
            //_this.DevByList[ri].icon = '/static/images/huihecode.jpg';
         }
      })
    })

    return res;
  }
}
