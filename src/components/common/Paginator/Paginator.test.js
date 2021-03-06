import React from 'react';
import {create} from 'react-test-renderer';
import Paginator from "./Paginator";

describe("Paginator component tests", () => {
        test('pages count is 11, but should be only 10', () => {
            const component = component.root;
            const spans = root.findAllByType("span");
            expect(spans.length).toBe(10);
        });
        test('if page count is more than 10 button NEXT should be presented', () => {
            const component = create(<Paginator totalUsersCount={11} pageSize={1} portionSize={10}/>);
            const root = component.root;
            let button = root.findAllByType("button");
            expect(button.length).toBe(1);
        });
    }
);
