import { world, system, Enchantment, ItemEnchantsComponent } from "@minecraft/server"
import * as Tool from"./src/libs/scarletToolKit";

export default class experiment {
    static main(){
        // Entity Events
        // world.afterEvents.projectileHit.subscribe(event =>{
        //     try{
        //         Tool.showEntityComponents(event.getEntityHit().entity);
        //     }
        //     catch{}
        // })
        
        // 获取方块属性
        world.afterEvents.itemUseOn.subscribe(event=>{
            Tool.testBlockInfo(event.source.dimension, event.block.location);
        });
        // 显示玩家属性
        world.afterEvents.playerBreakBlock.subscribe(event =>{
            try{
                Tool.showEntityComponents(event.player);
            }
            catch{}
        });
        // 测试字符
        world.afterEvents.chatSend.subscribe(event=>{
            let msg = event.message;
            if(msg.length === 2){
                if(true){
                    // 打印指定前缀
                    let base = parseInt(msg, 16)*16*16;
                    for(let i=0; i<16; i++){
                        let output = "";
                        for(let i2=0; i2<16; i2++){
                            output += String.fromCodePoint(base + i*16 + i2);//
                        }
                        Tool.logger(output);
                    }
                }
                else{
                    // 打印所有
                    let base=0;
                    let interv = system.runInterval(()=>{
                    if(base>=16*16) system.clearRun(interv);
                    let output = "";
                    Tool.logger(base);
                    for(let i=0; i<256; i++){
                        output += String.fromCodePoint(base*16*16 + i);//base + i*16 + i2
                    }
                    console.warn(output);
                    base++
                },5);
                }
            }
        });
    }
}