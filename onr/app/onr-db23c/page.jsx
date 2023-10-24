'use client';
import Link from "next/link";
import setup from "./details/setup.js"
import { Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"

const Data = () => {

    return(
        <div className="grid grid-cols-8 gap-4">
            <table className="table table-zebra">
                <thead>
                    <tr>
                    <th></th> 
                    <th></th>  
                    </tr>
                </thead> 
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            <Collapsible>
                                <CollapsibleTrigger>DB23c Setup</CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <pre style={{ fontSize: 11 }} dangerouslySetInnerHTML={{ __html: JSON.stringify(setup).replace(/"/g, "") }}></pre>
                                    </CollapsibleContent>
                                </Collapsible>
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>
                            <Collapsible>
                                <CollapsibleTrigger>DB23c Documentation</CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <pre>TBD</pre>
                                    </CollapsibleContent>
                                </Collapsible>
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>
                            <Collapsible>
                                <CollapsibleTrigger>Video Instructions</CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <pre>TBD</pre>
                                    </CollapsibleContent>
                                </Collapsible>
                        </th>
                    </tr>
                </tbody> 
            </table>
        </div>
    )
}

export default Data;
