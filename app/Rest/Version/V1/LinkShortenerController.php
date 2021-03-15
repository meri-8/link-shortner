<?php

namespace App\Rest\Version\V1;

use App\Http\Controllers\Controller;
use App\Models\LinkShortener;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LinkShortenerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $links = LinkShortener::all();
        return response()->json([
            'links' => $links
        ], Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, LinkShortener $linkShortener)
    {
        $request->validate([
            'link' => 'required|url|unique:link_shorteners,link'
        ]);

        $linkShortener->link = $request->link;
        $linkShortener->code = \Illuminate\Support\Str::random('5');
        $linkShortener->save();

        return response()->json(['link' => $linkShortener], Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, LinkShortener $link)
    {
        $request->validate([
            'link' => 'required|url|unique:link_shorteners,link,'.$link->id
        ]);

        $link->link = $request->link;
        $link->save();

        return response()->json(['link' => $link], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(LinkShortener $link)
    {
        $link->delete();
        return response()->json([], Response::HTTP_OK);
    }
}
