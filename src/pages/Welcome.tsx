import React, { useMemo } from 'react';
import 'antd/dist/antd.less';

import {
  ComponentTreeWidget,
  CompositePanel,
  Designer,
  DesignerToolsWidget,
  HistoryWidget,
  OutlineTreeWidget,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
  ToolbarPanel,
  ViewPanel,
  ViewportPanel,
  ViewToolsWidget,
  Workspace,
  WorkspacePanel,
} from '@designable/react';
import {
  ActionsWidget,
  LogoWidget,
  MarkupSchemaWidget,
  PreviewWidget,
  SchemaEditorWidget,
} from '@designable/formily-antd/playground/widgets';
import {
  Card,
  Cascader,
  Checkbox,
  DatePicker,
  Field,
  Form,
  FormCollapse,
  FormGrid,
  FormLayout,
  FormTab,
  Input,
  NumberPicker,
  ObjectContainer,
  Password,
  Radio,
  Rate,
  Select,
  Slider,
  Space,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from '@designable/formily-antd';
import { SettingsForm } from '@designable/react-settings-form';
import { ArrayCards, ArrayTable } from '@designable/formily-antd/lib';

import { createDesigner, Shortcut, GlobalRegistry, KeyCode } from '@designable/core';

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
      Displays: '展示组件',
    },
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
      Displays: 'Displays',
    },
  },
  'ko-KR': {
    sources: {
      Inputs: '입력',
      Layouts: '레이아웃',
      Arrays: '배열',
      Displays: '디스플레이',
    },
  },
});
const Edit: React.FC = () => {
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler(ctx) {
              // saveSchema(ctx.engine)
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    [],
  );
  return (
    <>
      <Designer engine={engine}>
        <StudioPanel logo={<LogoWidget />} actions={<ActionsWidget />}>
          <CompositePanel>
            <CompositePanel.Item title="panels.Component" icon="Component">
              <ResourceWidget
                title="sources.Inputs"
                sources={[
                  Input,
                  Password,
                  NumberPicker,
                  Rate,
                  Slider,
                  Select,
                  TreeSelect,
                  Cascader,
                  Transfer,
                  Checkbox,
                  Radio,
                  DatePicker,
                  TimePicker,
                  Upload,
                  Switch,
                  ObjectContainer,
                ]}
              />
              <ResourceWidget
                title="sources.Layouts"
                sources={[Card, FormGrid, FormTab, FormLayout, FormCollapse, Space]}
              />
              <ResourceWidget title="sources.Arrays" sources={[ArrayCards, ArrayTable]} />
              <ResourceWidget title="sources.Displays" sources={[Text]} />
            </CompositePanel.Item>
            <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
              <OutlineTreeWidget />
            </CompositePanel.Item>
            <CompositePanel.Item title="panels.History" icon="History">
              <HistoryWidget />
            </CompositePanel.Item>
          </CompositePanel>
          <Workspace id="form">
            <WorkspacePanel>
              <ToolbarPanel>
                <DesignerToolsWidget />
                <ViewToolsWidget use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']} />
              </ToolbarPanel>
              <ViewportPanel style={{ height: '100%' }}>
                <ViewPanel type="DESIGNABLE">
                  {() => (
                    <ComponentTreeWidget
                      components={{
                        Form,
                        Field,
                        Input,
                        Select,
                        TreeSelect,
                        Cascader,
                        Radio,
                        Checkbox,
                        Slider,
                        Rate,
                        NumberPicker,
                        Transfer,
                        Password,
                        DatePicker,
                        TimePicker,
                        Upload,
                        Switch,
                        Text,
                        Card,
                        ArrayCards,
                        ArrayTable,
                        Space,
                        FormTab,
                        FormCollapse,
                        FormGrid,
                        FormLayout,
                        ObjectContainer,
                      }}
                    />
                  )}
                </ViewPanel>
                <ViewPanel type="JSONTREE" scrollable={false}>
                  {(tree, onChange) => <SchemaEditorWidget tree={tree} onChange={onChange} />}
                </ViewPanel>
                <ViewPanel type="MARKUP" scrollable={false}>
                  {(tree) => <MarkupSchemaWidget tree={tree} />}
                </ViewPanel>
                <ViewPanel type="PREVIEW">{(tree) => <PreviewWidget tree={tree} />}</ViewPanel>
              </ViewportPanel>
            </WorkspacePanel>
          </Workspace>
          <SettingsPanel title="panels.PropertySettings">
            <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
          </SettingsPanel>
        </StudioPanel>
      </Designer>
    </>
  );
};

export default Edit;
