tyrano.plugin.kag.tag.playbgm={vital:["storage"],pm:{loop:"true",storage:"",fadein:"false",time:2E3,volume:"",buf:"0",target:"bgm",click:"false",stop:"false"},start:function(pm){var that=this;if(pm.target=="bgm"&&that.kag.stat.play_bgm==false){that.kag.ftag.nextOrder();return}if(pm.target=="se"&&that.kag.stat.play_se==false){that.kag.ftag.nextOrder();return}if(that.kag.define.FLAG_APRI==true)that.playGap(pm);else if($.userenv()!="pc"){this.kag.layer.hideEventLayer();if(this.kag.stat.is_skip==true&&
pm.target=="se"){that.kag.layer.showEventLayer();that.kag.ftag.nextOrder()}else if(pm.click=="true")$(".tyrano_base").bind("click.bgm",function(){that.play(pm);$(".tyrano_base").unbind("click.bgm");that.kag.layer.showEventLayer()});else{that.play(pm);$(".tyrano_base").unbind("click.bgm");that.kag.layer.showEventLayer()}}else that.play(pm)},play:function(pm){var that=this;var target="bgm";if(pm.target=="se"){target="sound";this.kag.tmp.is_se_play=true;if(this.kag.stat.map_vo["vobuf"][pm.buf])this.kag.tmp.is_vo_play=
true}else{this.kag.tmp.is_audio_stopping=false;this.kag.tmp.is_bgm_play=true}var volume=1;if(pm.volume!=="")volume=parseFloat(parseInt(pm.volume)/100);else if(target==="bgm"){if(typeof this.kag.config.defaultBgmVolume=="undefined")volume=1;else volume=parseFloat(parseInt(this.kag.config.defaultBgmVolume)/100);if(typeof this.kag.stat.map_bgm_volume[pm.buf]!="undefined")volume=parseFloat(parseInt(this.kag.stat.map_bgm_volume[pm.buf])/100)}else{if(typeof this.kag.config.defaultSeVolume=="undefined")volume=
1;else volume=parseFloat(parseInt(this.kag.config.defaultSeVolume)/100);if(typeof this.kag.stat.map_se_volume[pm.buf]!="undefined")volume=parseFloat(parseInt(this.kag.stat.map_se_volume[pm.buf])/100)}var storage_url="";var browser=$.getBrowser();var storage=pm.storage;if(this.kag.config.mediaFormatDefault!="mp3")if(browser=="msie"||browser=="safari"||browser=="edge")storage=$.replaceAll(storage,".ogg",".m4a");if($.isHTTP(pm.storage))storage_url=storage;else if(storage!="")storage_url="./data/"+target+
"/"+storage;else storage_url="";var audio_obj=null;var is_new_audio=false;if(target=="bgm")if(this.kag.tmp.map_bgm[pm.buf]!=null){audio_obj=this.kag.tmp.map_bgm[pm.buf];audio_obj.src=storage_url}else{audio_obj=new Audio(storage_url);is_new_audio=true}else if(this.kag.tmp.map_se[pm.buf]!=null){audio_obj=this.kag.tmp.map_se[pm.buf];audio_obj.src=storage_url}else{audio_obj=new Audio(storage_url);is_new_audio=true}audio_obj.volume=volume;if(pm.loop=="true"){audio_obj.loop=true;audio_obj.onended=function(){this.play()}}else if(pm.loop==
"smooth"){var audio_interval=setInterval(function(){var last_time=audio_obj.duration-audio_obj.currentTime;if(last_time<0.1){audio_obj.currentTime=0;audio_obj.play()}},30);$(audio_obj).on("pause",function(){clearInterval(audio_interval)})}else{audio_obj.loop=false;audio_obj.onended=function(){}}if(target==="bgm"){this.kag.tmp.map_bgm[pm.buf]=audio_obj;that.kag.stat.current_bgm=storage}else{if(this.kag.tmp.map_se[pm.buf]!=null){this.kag.tmp.map_se[pm.buf].pause();this.kag.tmp.map_se[pm.buf]=null}this.kag.tmp.map_se[pm.buf]=
audio_obj}audio_obj.play();if(pm.fadein=="true"){var vars=jQuery.extend($("<div>")[0],{volume:0});$(vars).stop().animate({"volume":volume},{easing:"linear",duration:parseInt(pm.time),step:function(){audio_obj.volume=this.volume},complete:function(){}})}if(is_new_audio==true)audio_obj.addEventListener("ended",function(e){if(pm.target=="se"){that.kag.tmp.is_se_play=false;that.kag.tmp.is_vo_play=false;if(that.kag.tmp.is_se_play_wait==true){that.kag.tmp.is_se_play_wait=false;that.kag.ftag.nextOrder()}else if(that.kag.tmp.is_vo_play_wait==
true){that.kag.tmp.is_vo_play_wait=false;setTimeout(function(){that.kag.ftag.nextOrder()},500)}}else if(pm.target=="bgm"){that.kag.tmp.is_bgm_play=false;if(that.kag.tmp.is_bgm_play_wait==true){that.kag.tmp.is_bgm_play_wait=false;that.kag.ftag.nextOrder()}}});if(pm.stop=="false")this.kag.ftag.nextOrder()},playGap:function(pm){var that=this;var target="bgm";if(pm.target=="se")target="sound";var audio_obj=null;if(target==="bgm")this.kag.stat.current_bgm=pm.storage;var src_url="./data/"+target+"/"+pm.storage;
if($.userenv()==="android"||$.userenv()==="andoroid")src_url=$.getBaseURL()+"data/"+target+"/"+pm.storage;var audio_obj=new Media(src_url,function(){if(pm.loop=="true"){var tmp_obj=null;if(pm.target=="bgm")tmp_obj=that.kag.tmp.map_bgm[pm.storage];else tmp_obj=that.kag.tmp.map_se[pm.buf];if(tmp_obj!=null)audio_obj.play()}});if(pm.target=="bgm")this.kag.tmp.map_bgm[pm.storage]=audio_obj;else this.kag.tmp.map_se[pm.buf]=audio_obj;this.playAudio(audio_obj,pm,target);if(pm.stop=="false")this.kag.ftag.nextOrder()},
playAudio:function(audio_obj,pm,target){var volume=1;if(pm.volume!="")volume=parseFloat(parseInt(pm.volume)/100);else if(target==="bgm")if(!this.kag.config.defaultBgmVolume)volume=1;else volume=parseFloat(parseInt(this.kag.config.defaultBgmVolume)/100);else if(!this.kag.config.defaultSeVolume)volume=1;else volume=parseFloat(parseInt(this.kag.config.defaultSeVolume)/100);audio_obj.setVolume(volume);audio_obj.play()},playSwf:function(pm){var target="bgm";if(pm.target=="se")target="sound";var repeat=
1;if(pm.loop=="true")repeat=9999;var target="bgm";if(pm.target=="se")target="sound";var storage_url="";if($.isHTTP(pm.storage))storage_url=pm.storage;else storage_url="./data/"+target+"/"+pm.storage;if(target==="bgm"){this.kag.stat.current_bgm=pm.storage;this.kag.sound_swf.playMusic(storage_url,repeat)}else this.kag.sound_swf.playSound(storage_url,repeat);if(pm.stop=="false")this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.stopbgm={pm:{fadeout:"false",time:2E3,target:"bgm",buf:"0",stop:"false"},start:function(pm){var that=this;var target_map=null;if(pm.target=="bgm"){target_map=this.kag.tmp.map_bgm;that.kag.tmp.is_bgm_play=false;that.kag.tmp.is_bgm_play_wait=false}else{target_map=this.kag.tmp.map_se;that.kag.tmp.is_se_play=false;that.kag.tmp.is_se_play_wait=false}var browser=$.getBrowser();if(that.kag.define.FLAG_APRI==true)for(key in target_map){if(key==pm.buf)(function(){var _key=key;var _audio_obj=
null;if(pm.target==="bgm"){_audio_obj=target_map[_key];if(pm.stop=="false")that.kag.stat.current_bgm=""}else _audio_obj=target_map[_key];if(pm.target==="bgm"){that.kag.tmp.map_bgm[_key]=null;delete that.kag.tmp.map_bgm[_key]}else{that.kag.tmp.map_se[_key]=null;delete that.kag.tmp.map_se[_key]}_audio_obj.stop();_audio_obj.release()})()}else for(key in target_map)if(key==pm.buf)(function(){var _key=key;var _audio_obj=null;if(pm.target==="bgm"){_audio_obj=target_map[_key];if(pm.stop=="false")that.kag.stat.current_bgm=
""}else _audio_obj=target_map[_key];if(pm.fadeout=="true"){that.kag.tmp.is_audio_stopping=true;var vars=jQuery.extend($("<div>")[0],{"volume":_audio_obj.volume});$(vars).stop().animate({volume:0},{easing:"linear",duration:parseInt(pm.time),step:function(){if(that.kag.tmp.is_audio_stopping==false){$(vars).stop();return false}_audio_obj.volume=this.volume},complete:function(){that.kag.tmp.is_audio_stopping=false;_audio_obj.pause()}})}else{_audio_obj.pause();if(pm.target==="bgm");else;}})();if(pm.stop==
"false")this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.fadeinbgm={vital:["storage","time"],pm:{loop:"true",storage:"",fadein:"true",time:2E3},start:function(pm){if(parseInt(pm.time)<=100)pm.time=100;this.kag.ftag.startTag("playbgm",pm)}};tyrano.plugin.kag.tag.fadeoutbgm={pm:{loop:"true",storage:"",fadeout:"true",time:2E3},start:function(pm){this.kag.ftag.startTag("stopbgm",pm)}};
tyrano.plugin.kag.tag.xchgbgm={vital:["storage","time"],pm:{loop:"true",storage:"",fadein:"true",fadeout:"true",time:2E3},start:function(pm){this.kag.ftag.startTag("stopbgm",pm);this.kag.ftag.startTag("playbgm",pm)}};tyrano.plugin.kag.tag.playse={vital:["storage"],pm:{storage:"",target:"se",volume:"",loop:"false",buf:"0",clear:"false"},start:function(pm){if(pm.clear=="true")this.kag.ftag.startTag("stopbgm",{target:"se",stop:"true"});this.kag.ftag.startTag("playbgm",pm)}};
tyrano.plugin.kag.tag.stopse={pm:{storage:"",fadeout:"false",time:2E3,buf:"0",target:"se"},start:function(pm){this.kag.ftag.startTag("stopbgm",pm)}};tyrano.plugin.kag.tag.fadeinse={vital:["storage","time"],pm:{storage:"",target:"se",loop:"false",volume:"",fadein:"true",buf:"0",time:"2000"},start:function(pm){if(parseInt(pm.time)<=100)pm.time=100;this.kag.ftag.startTag("playbgm",pm)}};
tyrano.plugin.kag.tag.fadeoutse={pm:{storage:"",target:"se",loop:"false",buf:"0",fadeout:"true"},start:function(pm){this.kag.ftag.startTag("stopbgm",pm)}};
tyrano.plugin.kag.tag.bgmopt={pm:{volume:"100",effect:"true",buf:""},start:function(pm){var map_bgm=this.kag.tmp.map_bgm;if(pm.buf!="")this.kag.stat.map_bgm_volume[pm.buf]=pm.volume;else{this.kag.stat.map_bgm_volume={};this.kag.config.defaultBgmVolume=pm.volume}if(pm.effect=="true"&&this.kag.define.FLAG_APRI==false){var new_volume=parseFloat(parseInt(pm.volume)/100);if(pm.buf=="")for(key in map_bgm){if(map_bgm[key])map_bgm[key].volume=new_volume}else if(map_bgm[pm.buf])map_bgm[pm.buf].volume=new_volume}this.kag.ftag.startTag("eval",
{"exp":"sf._system_config_bgm_volume = "+pm.volume})}};
tyrano.plugin.kag.tag.seopt={pm:{volume:"100",effect:"true",buf:""},start:function(pm){var map_se=this.kag.tmp.map_se;if(pm.buf!="")this.kag.stat.map_se_volume[pm.buf]=pm.volume;else{this.kag.stat.map_se_volume={};this.kag.config.defaultSeVolume=pm.volume}if(pm.effect=="true"&&this.kag.define.FLAG_APRI==false){var new_volume=parseFloat(parseInt(pm.volume)/100);if(pm.buf=="")for(key in map_se){if(map_se[key])map_se[key].volume=new_volume}else if(map_se[pm.buf])map_se[pm.buf].volume=new_volume}this.kag.ftag.startTag("eval",
{"exp":"sf._system_config_se_volume = "+pm.volume})}};tyrano.plugin.kag.tag.wbgm={pm:{},start:function(){if(this.kag.tmp.is_bgm_play==true)this.kag.tmp.is_bgm_play_wait=true;else this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.wse={pm:{},start:function(){if(this.kag.tmp.is_se_play==true)this.kag.tmp.is_se_play_wait=true;else this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.voconfig={pm:{sebuf:"0",name:"",vostorage:"",number:""},start:function(pm){var map_vo=this.kag.stat.map_vo;this.kag.stat.map_vo["vobuf"][pm.sebuf]=1;if(pm.name!=""){var vochara={};if(this.kag.stat.map_vo["vochara"][pm.name])vochara=this.kag.stat.map_vo["vochara"][pm.name];else vochara={"vostorage":"","buf":pm.sebuf,"number":0};if(pm.vostorage!="")vochara["vostorage"]=pm.vostorage;if(pm.number!="")vochara["number"]=pm.number;this.kag.stat.map_vo["vochara"][pm.name]=vochara}this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.vostart={pm:{},start:function(){this.kag.stat.vostart=true;this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.vostop={pm:{},start:function(){this.kag.stat.vostart=false;this.kag.ftag.nextOrder()}};
