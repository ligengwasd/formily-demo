import React, { useMemo } from 'react';
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
  FormLayout,
  NumberPicker,
  ObjectContainer,
  Password,
  Rate,
  Slider,
  TreeSelect,
} from '@designable/formily-antd';
import { SettingsForm } from '@designable/react-settings-form';
import { ArrayCards, ArrayTable } from '@designable/formily-antd/lib';
import { createDesigner, Shortcut } from '@designable/core';

const Edit: React.FC = () => {
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            // codes: [
            //   [KeyCode.Meta, KeyCode.S],
            //   [KeyCode.Control, KeyCode.S],
            // ],
            // handler(ctx) {
            //   saveSchema(ctx.engine)
            // },
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
                  Password,
                  NumberPicker,
                  Rate,
                  Slider,
                  TreeSelect,
                  Cascader,
                  ObjectContainer,
                ]}
              />
              <ResourceWidget title="sources.Layouts" sources={[Card, FormLayout]} />
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
              <ViewportPanel>
                <ViewPanel type="DESIGNABLE">
                  {() => (
                    <ComponentTreeWidget
                      components={{
                        TreeSelect,
                        Cascader,
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
