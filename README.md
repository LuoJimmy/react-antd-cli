

# react-antd-cli

适用脚手架：https://github.com/JinJieTan/fed-zulin-template

## 安装
```
npm install -g react-antd-cli
```

## 使用

1. antd g module xxx

   生成xxx文件夹，里面包含的文件：
   ```
   └── xxx
    ├── index.less // 样式文件
    ├── index.test.tsx // 测试文件
    ├── index.tsx // 业务入口组件
    ├── model.ts // 状态管理文件
    ├── provider.ts // 常量、业务函数抽离的服务
    ├── routes.ts // 路由文件
    ├── service.ts // 接口服务文件
    ├── type.ts // 类型文件
    ```
   - index.tsx

    ```tsx
   import React from 'react';
   import { Switch } from 'dva/router';
   import { RouteChildrenProps } from 'react-router';
   import './index.less';
   
   interface IProps extends RouteChildrenProps {
       children: any
   }
   
   const Xxx = (props: IProps) => {
       const { children } = props;
       return (
         	<div className="xxx">
           	This is module xxx, please delete this line in your project.
           	<Switch>
               {children}
           	</Switch>
         	</div>
       );
   };
   export default Xxx;
   ```

   - index.less

    ```less
    .xxx {
       
    }
    ```

   - routes.ts // 路由

    ```typescript
     import { IRoute } from '@/types/common';
     
     let routes: Array<IRoute> = [
         {
             path: '/xxx',
             component: () => import('./index'),
             models: () => [import('./model')],
             routes: [
                 
             ]
         },
     ];
     export default routes;
     
    ```

   - type.ts // 类型

   - index.test.tsx // 测试文件
    ```tsx
        import React from 'react'
        import { shallow } from 'enzyme'     // 本例子只以shallow(浅渲染，只渲染父组件)为例
        import Xxx from './index'     // 导入需测试的组件

        declare const test: any;
        declare const expect: any;

        test('Xxx', ()=>{
            const props = {
                history: {} as any,
                location: {} as any,
                match: {} as any,
                children: null
            }
            const item = shallow(<Xxx  {...props}/>);
            expect(item.hasClass('xxx')).toBe(true)
        })
    ```
   - service.ts // 接口服务文件

    ```typescript
     import ajax from '@/api/utils/ajax';
     
     // export service functions
    ```

   - provider.ts // 常量、业务函数抽离的服务

   - model.ts // dva文件，放redux

    ```typescript
     export default {
         namespace: 'xxx',
         state: {
             
         },
         reducers: {
             // reducers function
         },
         effects: {
           // effects function
         },
     };
    ```

     

2. antd g page yyy

   生成yyy文件夹

   ​里面包含的文件：
   ```
   └── yyy
      ├── index.less // 样式文件
      ├── index.test.tsx // 测试文件
      ├── index.tsx // 页面组件
      └── type.ts // 类型文件
   ```

   - index.tsx

    ```tsx
     import React from 'react';
     import { RouteChildrenProps } from 'react-router';
     import './index.less';
     
     interface IProps extends RouteChildrenProps {
     	// extends type of props    
     }
     
     const XxxYyy = (props: IProps) => {
         const { children } = props;
         return (
           	<div className="xxx-yyy">
             	This is page yyy, please delete this line in your project.
           	</div>
         );
     };
     export default XxxYyy;
    ```

     > Xxx是当前路径下的父文件夹名（即刚才通过antd g page 生成的module名）

   - Index.less

    ```less
     .xxx-yyy {
     
     }
    ```

   - index.test.tsx // 测试文件
    ```tsx
    import React from 'react'
    import { shallow } from 'enzyme'     // 本例子只以shallow(浅渲染，只渲染父组件)为例
    import XxxYyy from './index'     // 导入需测试的组件

    declare const test: any;
    declare const expect: any;

    test('XxxYyy', ()=>{
        const props = {
            history: {} as any,
            location: {} as any,
            match: {} as any,
            children: null
        }
        const item = shallow(<XxxYyy  {...props}/>);
        expect(item.hasClass('xxx-yyy')).toBe(true)
    })
    ```

   - type.ts

   并且更新module里的routes.ts

   ```typescript
   import { IRoute } from '@/types/common';
   
   let routes: Array<IRoute> = [
       {
           path: '/xxx',
           component: () => import('./index'),
           models: () => [import('./model')],
           routes: [
               {
                   path: '/xxx/yyy',
                   component: () => import('./yyy'),
                   routes: [
               		
           				]
               }
           ]
       },
   ];
   export default routes;
   
   ```
   - service.ts // 接口服务文件

    ```typescript
     import ajax from '@/api/utils/ajax';
     
     // export service functions
    ```

   > 1、如果yyy里含有`detail`或者`edit`字符将会为path后加`id`, eg: `/xxx/yyy/:id`  
     2、如果手动改了routes.ts文件，如删除了`routes`字段会造成更新错误，请手动调整  
     3、参数`-r, --redirect`, 该路由为重定向路由  
     4、参数`-f, --father`, 父级路由路径，默认为当前模块路由路径`/xxx`
  
     
3. antd g component zzzComponent

   3.1 在公共组件下`src/components`生成ZzzComponent文件夹

   ​里面包含的文件：
   ```
   └── ZzzComponent
      ├── index.less // 样式文件
      └── index.tsx // 组件
   ```

   - index.tsx

    ```tsx
    import React from 'react';
    import './index.less';

    interface IProps {
        
    }

    const ZzzComponent = (props: IProps) => {
        return (
            <div className="zzz-component">
                This is component ZzzComponent, please delete this line in your project.
            </div>
        );
    };
    export default ZzzComponent;
    ```

   - index.less

    ```less
     .zzz-component {
     
     }
    ```

    3.1 业务组件中默认生成扁平的结构
    ​里面包含的文件：
   ```
   └── components
      ├── ZzzComponent.less // 样式文件
      └── ZzzComponent.tsx // 组件
      ...
   ```

   - ZzzComponent.tsx

    ```tsx
    import React from 'react';
    import './ZzzComponent.less';

    interface IProps {
        
    }

    const ZzzComponent = (props: IProps) => {
        return (
            <div className="zzz-component">
                This is component ZzzComponent, please delete this line in your project.
            </div>
        );
    };
    export default ZzzComponent;
    ```

   - ZzzComponent.less

    ```less
     .zzz-component {
     
     }
    ```
    


   > 1、可以通过参数`-f, --folder`, 来控制以文件夹格式组织